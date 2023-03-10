// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@element-plus/nuxt", "@nuxtjs/supabase"],
  elementPlus: { importStyle: "scss" },
  ssr: process.env.NODE_ENV !== "development",
});
