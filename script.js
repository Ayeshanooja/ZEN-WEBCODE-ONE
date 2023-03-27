
let prevBtnEl= document.querySelector('#previous')
let nextBtnEl= document.querySelector('#next')
let pokemonCards= document.querySelector('#pokemon-Cards')

var api='https://pokeapi.co/api/v2/pokemon/'
async function fetchingfun(apiurl){
    var v1= await fetch(apiurl)
    checkv1=await v1.json()
    return checkv1
}

let previous=null
let next=null;

async function code(){
    
    var c1= await fetchingfun(api)
    console.log(c1.results)
    let results=c1.results;
    
    let list=[];
    
previous=c1.previous
next=c1.next
    try {
        for(let i=0; i<results.length; i++)
        {
            list.push(fetchingfun(results[i].url))
            // console.log(results[i])
            console.log(2)
        }
        // console.log(list) 
    } catch (error) {
    //    console.log('error') 
    }
    
    Promise.all(list).then(c1=>{
        
        // console.log(c1)
        display(c1)
    })
    
}
code()

let display= async(c1)=>{
       try{
        for(let i=0; i<c1.length; i++)
        {
            console.log(c1[i])
            let pokemonId=c1[i].id;
            let pokemonName=c1[i].name
            let pokemonImg=c1[i].sprites.other['official-artwork'].front_default
            let pokemonWeight=c1[i].weight
            
            pokemonCards.innerHTML +=`
            <div class="card shadow-sm" style="width: 18rem;">
            <img src="${pokemonImg}" class="card-img-top" alt="${pokemonName}">
            <div class="card-body px-0">
              <h5 class="card-title text-center">${pokemonName}</h5>
              <div class="card-text pokemon-weight " gap-1>weight:${pokemonWeight}</div>
             <div class="card-text pokemon-id>${pokemonId}</div>
            </div>
          </div>
            `
            
        } 
       }
       catch(Error)
       {
        console.log('error')
       }
}

let prevBtn = async ()=>{
    //     if(previous != null)
    // {
    //     await code(previous)
    // }
    // else{
    //     console.log("error")
    // }
    try{
        let prev = await code(previous)
    return(prev)
    }
    catch{
        console.log('error')
    }
    // console.log(results)
}

let nextBtn = async ()=>{
    if(next!==null)
    {
        await code(next)
    }
    else
    {
        console.log("error")
    }
    // let nextdata = await c1(next)
    // console.log(nextdata)
    // console.log(results)
}

prevBtnEl.addEventListener('click', prevBtn)
nextBtnEl.addEventListener('click',nextBtn)
