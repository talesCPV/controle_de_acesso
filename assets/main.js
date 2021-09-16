function openMenu(){
    if(localStorage.getItem("token") == null){
        logout_here();
    }else{

        let menu_bar = document.querySelector('.menu-bar');
        menu_bar.innerHTML = "";

        const data = new URLSearchParams();        
        data.append("token", localStorage.getItem("token"));

        const myRequest = new Request("db/openMenu.php",{
            method : "POST",
            body : data
        });           

        fetch(myRequest)
        .then((response)=>{

            if (response.status === 200) { 
                return response.text();                                          
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"));                        
            } 

        })

        .then((json)=>{ // montagem do menu
            const menu = JSON.parse(json)
            let list = document.createElement('ul');
            for(let index=0; index< menu.length; index++){
                const item = menu[index];
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#menu-'+index;
                a.innerHTML = item.nome;
                const ul = document.createElement('ul');
                    ul.id = "menu-"+index;
                    ul.className = "sub-menu";
                if(item.itens.length > 0){
                    for(let i=0; i< item.itens.length; i++){
                        const sub_li = document.createElement('li');
                        const sub_a = document.createElement('a');
                        sub_a.innerHTML = item.itens[i].nome;
                        sub_li.appendChild(sub_a);
                        sub_li.addEventListener('click',()=>{
                            openHTML(item.itens[i].template,item.itens[i].window, item.itens[i].title);
                        });
                        ul.appendChild(sub_li);
                    }
                }else{
                    li.addEventListener('click',()=>{
                        openHTML(item.template,item.window,item.title);
                    });
                }

                li.appendChild(a);
                li.appendChild(ul);
                list.appendChild(li);                
                menu_bar.appendChild(list)
                if(item.autoexec){
                    openHTML(item.template,item.window,item.title);
                }                    
            }

        });
            

    }
    
}

function logout_here(){
    localStorage.clear();
    window.open("index.html","_self")  
}

function openHTML(template,where="window",label){
    if(template.trim() != ""){
        fetch( "templates/"+template)
        .then( stream => stream.text())
        .then( text => {
            const temp = document.createElement('div');
            temp.innerHTML = text;
            const body = temp.getElementsByTagName('template')[0];
            const script = temp.getElementsByTagName('script')[0];
            if(body != undefined){
                if(where == "self"){
                screen.innerHTML = body.innerHTML
            }else{
                modal_text.innerHTML = body.innerHTML;
                modal_title.innerHTML = label;
                modal.style.display = "block";
            }
            eval(script.innerHTML);
            }
        }); 
    }
}

function queryDB(params,cod){
    const data = new URLSearchParams();        
    data.append("cod", cod);
    data.append("token", localStorage.getItem("token"));
    data.append("params", JSON.stringify(params));

    const myRequest = new Request("db/query_db.php",{
        method : "POST",
        body : data
    });

    return new Promise((resolve,reject) =>{

      fetch(myRequest)
      .then(function (response){

          if (response.status === 200) { 
              resolve(response.text());
              
          } else { 
              reject(new Error("Houve algum erro na comunicação com o servidor"));
             
          } 

      });            

    });      
}