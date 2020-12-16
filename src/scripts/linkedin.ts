import Profil from "../models/Profil";

async function getProfilInfos(): Promise<Profil> {
  const fullName = document.querySelectorAll('.pv-top-card--list li')[0];
  const title = document.querySelectorAll('.pv-top-card h2.mt1')[0];
  const image = document.querySelectorAll('.Profil-photo-edit img')[0];
  const couverture = document.querySelectorAll('.Profil-background-image__image')[0]
  const actualCompany = document.querySelectorAll('.EntityPhoto-square-1')[0]


  return {
    fullName: fullName.textContent.replace(/\n/, "").trim(),
    title: title.textContent.replace(/\n/, "").trim(),
    country: "XXX",
    imageSrc: image.getAttribute('src'),
    couvertureImage: couverture.getAttribute('src'),
    actualCompanyImg: actualCompany.getAttribute('src')
  };
}

let profil: Profil = null;
setTimeout(() => {
  getProfilInfos().then(result => {
    profil = result || profil;
  })
}, 3000)

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "getFullName") {
    response(profil)
  }
  return true;
});