const fetchData = async () =>{
    try{
        const res = await fetch("https://chinguapi.onrender.com/dinosaurs");
        const data = await res.json();
        console.log(data)
    }catch(err){
        console.log("Fetch Error",err);
    }
}

fetchData();