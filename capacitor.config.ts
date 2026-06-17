import type { CapacitorConfig } from "@capacitor/cli";

/**
 * EduWeb Gouvernance — coque mobile Capacitor.
 *
 * L'app est rendue côté serveur (Next.js + server actions + Prisma) : elle ne
 * peut pas être exportée en statique. La coque native charge donc le site
 * déployé via `server.url`, et ajoute les notifications locales (rappels RDV).
 *
 * URL de production de l'app (override possible via CAP_SERVER_URL avant
 * `npx cap sync`).
 */
const PROD_URL = process.env.CAP_SERVER_URL ?? "https://governance.eduweb.ci";

const config: CapacitorConfig = {
  appId: "ci.eduweb.governance",
  appName: "EduWeb Gouvernance",
  webDir: "mobile/www",
  server: {
    url: PROD_URL,
    cleartext: false,
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon",
      iconColor: "#16a34a",
    },
  },
};

export default config;
