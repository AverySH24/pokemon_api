
var chosen = [];

const getMon = async ()=>{
  chosen = []
  document.getElementById("box").innerHTML = "";
  let pokeNum = Math.floor(Math.random()*898) + 1;
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokeNum +"/");
  chosen.push(response.data.name);

  //goes to types, takes the first of the list, takes type dictionary, NOTE.url takes the url to the type .name takes you to the name of the type
  const typeUrl = response.data.types[0].type.url

  const typeResponse = await axios.get(typeUrl)
  let pokemonList = typeResponse.data.pokemon;
  console.log(pokemonList);
  while (chosen.length < 7){
    let randMon = Math.floor(Math.random()*pokemonList.length);
    if (!chosen.includes(pokemonList[randMon].pokemon.name)){
      //Add that pokemon
      setOneMon(pokemonList[randMon].pokemon.name);
      chosen.push(pokemonList[randMon].pokemon.name);
    }
  }
}




//Adding one pokemon
const setOneMon = async (sign) =>{
  let monImage = document.createElement("img");
  let monName = document.createElement("h1");
  monName.setAttribute("class", "monName");
  
  monImage.append(monName);

  const spriteImg = await axios.get("https://pokeapi.co/api/v2/pokemon/"+ sign +"/");

  monImage.src = spriteImg.data.sprites.front_default;
  monName.innerHTML = spriteImg.data.name;

  let parent = document.getElementById("box");
  parent.append(monImage);
  parent.append(monName);

}

