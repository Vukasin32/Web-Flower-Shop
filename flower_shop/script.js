function naruci(){
    var ime = document.forma.ime.value
    var prezime = document.forma.prezime.value
    var mejl = document.forma.mejl.value
    var posveta = document.forma.posveta.checked
    var brzadostava = document.forma.brzadostava.checked
    var box = document.forma.aranzman.value
    if(ime=="" || prezime=="" || mejl==""){
        alert("Morate uneti sve podatke - ime, prezime i mejl!")
    }
    else{
        var regexMejl = /^[a-zA-Z]{7,15}@[a-z]{5}\.(rs||com)$/; 
        if(regexMejl.test(mejl)){
            let niz = []
            if(localStorage.getItem("porudzbine")!=null){
                niz = JSON.parse(localStorage.getItem("porudzbine"))
            }
            let obj = {
                ime: ime,
                prezime: prezime,
                mejl: mejl,
                box: box,
                cena: 0
            }
            if (posveta) {
                obj.posveta = true;
            }
            if (brzadostava) {
                obj.brzadostava = true;
            }
            if(obj.box=="Box 5"){
                obj.cena = obj.cena + 1000
            }
            if(obj.box=="Box 10"){
                obj.cena = obj.cena + 1800
            }
            if(obj.box=="Box 100"){
                obj.cena = obj.cena + 10000
            }
            if(obj.posveta){
                obj.cena = obj.cena + 120
            }
            if(obj.brzadostava){
                obj.cena = obj.cena + 200
            }

            niz.push(obj)
            localStorage.setItem("porudzbine", JSON.stringify(niz))
            alert("Hvala Vam na porudzbini!")
        }
        else{
            alert("Mejl nije u dobrom formatu!")
        }
    }
}

// Funkcija za ispisivanje korpe i davanja popusta od 5% musteriji sa najvise porudzbina
function korpa(){     
    niz = JSON.parse(localStorage.getItem("porudzbine"))
    if(niz==null){
        alert("Korpa je trenutno prazna!")
    }

    // Mejl je jedinstven ----> Najvernija musterija je sa najvise porudzbina
    let max_narudzbina = 0
    let max_mejl = ""
    for(let i=0; i<niz.length; i++){
        let tren_mejl = niz[i].mejl
        let tren_narudz = 1
        for(let j=i; j<niz.length; j++){
            if ((niz[j].mejl==tren_mejl)){
                tren_narudz = tren_narudz + 1 
            }            
        } 
        if (tren_narudz > max_narudzbina){
            max_narudzbina = tren_narudz
            max_mejl = tren_mejl
        }
    }

    let poruka = ""    
    for(let i=0; i<niz.length; i++){
        if(niz[i].mejl==max_mejl){
            niz[i].cena = 0.95*niz[i].cena  // Najvernijoj musteriji se smanjuje cena svake porudzbine za 5%
        }
        poruka += niz[i].ime + " " + niz[i].prezime + " " + niz[i].mejl + " " + niz[i].cena + "\n"
    }
    alert(poruka)
}





