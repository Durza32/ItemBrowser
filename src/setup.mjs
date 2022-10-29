export async function setup(ctx) {
  const { greet } = await ctx.loadModule("src/helper.mjs");
  greet("Melvor");
}
