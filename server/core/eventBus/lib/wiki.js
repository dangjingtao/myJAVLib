const wiki = require("d-wiki");
module.exports = async function (e, info) {
  const { keyword, lang = "zh" } = info;
  const { response } = this;
  try {
    await wiki.setLang(lang);
    wiki.setProxy(`http://127.0.0.1:1080`);
    // console.log(newUrl);
    const page = await wiki.page(keyword);

    //Response of type @Page object
    const content = await page.content();
    const links = await page.links();
    const images = await page.images();
    const references = await page.references();
    return response.success({ content, links, images, references });
    //Response of type @wikiSummary - contains the intro and the main image
  } catch (error) {
    console.log(error);
    return response.success(error);
    //=> Typeof wikiError
  }
};
