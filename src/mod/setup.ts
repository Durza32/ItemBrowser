export async function setup(ctx: Modding.ModContext) {
  const { greet } = await ctx.loadModule("src/helper.js");
  greet("Melvor");
}
