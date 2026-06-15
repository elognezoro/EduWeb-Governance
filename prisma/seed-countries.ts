/**
 * Amorçage non destructif des pays (membres de l'ONU) et de leurs subdivisions
 * territoriales administratives de 1er niveau (table Region).
 *
 * Idempotent : peut être relancé sans créer de doublons.
 *   npm run db:seed:countries
 */
import { PrismaClient } from "@prisma/client";
import { Country, State } from "country-state-city";
import countries from "i18n-iso-countries";
import fr from "i18n-iso-countries/langs/fr.json";

countries.registerLocale(fr as never);

const prisma = new PrismaClient();

// 193 États membres de l'ONU (ISO 3166-1 alpha-2)
const UN_MEMBERS = [
  "AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BT",
  "BO","BA","BW","BR","BN","BG","BF","BI","CV","KH","CM","CA","CF","TD","CL","CN","CO","KM","CG","CD",
  "CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FJ","FI",
  "FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IR","IQ",
  "IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI",
  "LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","FM","MD","MC","MN","ME","MA","MZ","MM",
  "NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PY","PE","PH","PL","PT",
  "QA","RO","RU","RW","KN","LC","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO",
  "ZA","SS","ES","LK","SD","SR","SE","CH","SY","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV",
  "UG","UA","AE","GB","US","UY","UZ","VU","VE","VN","YE","ZM","ZW",
];

// Pays « prioritaires » (déclinaisons EduLex de démonstration) affichés en tête.
const NAMESPACES: Record<string, string> = { CI: "EduLex CI", SN: "EduLex SN", BJ: "EduLex BJ", CM: "EduLex CM", FR: "EduLex FR" };
const PRIORITY = ["CI", "SN", "BJ", "CM", "FR"];

// Corrections de noms vs référentiel ISO (qui sur-tirete certains intitulés).
const NAME_OVERRIDES: Record<string, string> = { CI: "Côte d'Ivoire" };

const flagEmoji = (iso2: string) =>
  iso2.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

async function main() {
  console.log("🌍 Pays de l'ONU + subdivisions administratives…");
  let createdCountries = 0, updatedCountries = 0, createdRegions = 0;

  for (const iso of UN_MEMBERS) {
    const csc = Country.getCountryByCode(iso);
    const name = NAME_OVERRIDES[iso] || countries.getName(iso, "fr") || csc?.name || iso;
    const order = PRIORITY.includes(iso) ? PRIORITY.indexOf(iso) + 1 : 100;

    const existing = await prisma.country.findUnique({ where: { code: iso } });
    const country = await prisma.country.upsert({
      where: { code: iso },
      update: {
        name,
        flag: flagEmoji(iso),
        isActive: true,
        ...(NAMESPACES[iso] ? { namespace: NAMESPACES[iso] } : {}),
        ...(PRIORITY.includes(iso) ? { order } : {}),
      },
      create: { code: iso, name, flag: flagEmoji(iso), namespace: NAMESPACES[iso] ?? null, order, isActive: true },
    });
    existing ? updatedCountries++ : createdCountries++;

    // Subdivisions de 1er niveau
    const states = State.getStatesOfCountry(iso) ?? [];
    if (states.length) {
      const already = await prisma.region.findMany({ where: { countryId: country.id }, select: { name: true } });
      const have = new Set(already.map((r) => r.name));
      const toCreate = states
        .filter((s) => s.name && !have.has(s.name))
        .map((s) => ({ name: s.name, code: s.isoCode || null, countryId: country.id }));
      if (toCreate.length) {
        await prisma.region.createMany({ data: toCreate });
        createdRegions += toCreate.length;
      }
    }
  }

  // Entrée spéciale « Global » (textes internationaux / supranationaux), placée juste après les pays prioritaires.
  await prisma.country.upsert({
    where: { code: "GLOBAL" },
    update: { order: PRIORITY.length + 1, isActive: true },
    create: { code: "GLOBAL", name: "Textes internationaux", namespace: "EduLex Global", flag: "🌐", order: PRIORITY.length + 1, isActive: true },
  });

  const totalCountries = await prisma.country.count();
  const totalRegions = await prisma.region.count();
  console.log(`   Pays : +${createdCountries} créés, ${updatedCountries} mis à jour (total ${totalCountries}).`);
  console.log(`   Subdivisions : +${createdRegions} créées (total ${totalRegions}).`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
