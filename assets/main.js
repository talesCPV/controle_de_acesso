/* CLASSES */ 

//class Webcam{constructor(e,t="user",s=null,i=null){this._webcamElement=e,this._webcamElement.width=this._webcamElement.width||640,this._webcamElement.height=this._webcamElement.height||.75*this._webcamElement.width,this._facingMode=t,this._webcamList=[],this._streamList=[],this._selectedDeviceId="",this._canvasElement=s,this._snapSoundElement=i}get facingMode(){return this._facingMode}set facingMode(e){this._facingMode=e}get webcamList(){return this._webcamList}get webcamCount(){return this._webcamList.length}get selectedDeviceId(){return this._selectedDeviceId}getVideoInputs(e){return this._webcamList=[],e.forEach(e=>{"videoinput"===e.kind&&this._webcamList.push(e)}),1==this._webcamList.length&&(this._facingMode="user"),this._webcamList}getMediaConstraints(){var e={};return""==this._selectedDeviceId?e.facingMode=this._facingMode:e.deviceId={exact:this._selectedDeviceId},{video:e,audio:!1}}selectCamera(){for(let e of this._webcamList)if("user"==this._facingMode&&e.label.toLowerCase().includes("front")||"enviroment"==this._facingMode&&e.label.toLowerCase().includes("back")){this._selectedDeviceId=e.deviceId;break}}flip(){this._facingMode="user"==this._facingMode?"enviroment":"user",this._webcamElement.style.transform="",this.selectCamera()}async start(e=!0){return new Promise((t,s)=>{this.stop(),navigator.mediaDevices.getUserMedia(this.getMediaConstraints()).then(i=>{this._streamList.push(i),this.info().then(i=>{this.selectCamera(),e?this.stream().then(e=>{t(this._facingMode)}).catch(e=>{s(e)}):t(this._selectedDeviceId)}).catch(e=>{s(e)})}).catch(e=>{s(e)})})}async info(){return new Promise((e,t)=>{navigator.mediaDevices.enumerateDevices().then(t=>{this.getVideoInputs(t),e(this._webcamList)}).catch(e=>{t(e)})})}async stream(){return new Promise((e,t)=>{navigator.mediaDevices.getUserMedia(this.getMediaConstraints()).then(t=>{this._streamList.push(t),this._webcamElement.srcObject=t,"user"==this._facingMode&&(this._webcamElement.style.transform="scale(-1,1)"),this._webcamElement.play(),e(this._facingMode)}).catch(e=>{console.log(e),t(e)})})}stop(){this._streamList.forEach(e=>{e.getTracks().forEach(e=>{e.stop()})})}snap(){if(null!=this._canvasElement){null!=this._snapSoundElement&&this._snapSoundElement.play(),this._canvasElement.height=this._webcamElement.scrollHeight,this._canvasElement.width=this._webcamElement.scrollWidth;let e=this._canvasElement.getContext("2d");return"user"==this._facingMode&&(e.translate(this._canvasElement.width,0),e.scale(-1,1)),e.clearRect(0,0,this._canvasElement.width,this._canvasElement.height),e.drawImage(this._webcamElement,0,0,this._canvasElement.width,this._canvasElement.height),this._canvasElement.toDataURL("image/png")}throw"canvas element is missing"}}

class Webcam{
    constructor(e,t="user",s=null,i=null){
        this._webcamElement=e,
        this._webcamElement.width=this._webcamElement.width||640,
        this._webcamElement.height=this._webcamElement.height||.75*this._webcamElement.width,
        this._facingMode=t,
        this._webcamList=[],
        this._streamList=[],
        this._selectedDeviceId="",
        this._canvasElement=s,
        this._snapSoundElement=i
    }
    get facingMode(){
        return this._facingMode
    }
    set facingMode(e){
        this._facingMode=e
    }
    get webcamList(){
        return this._webcamList
    }
    get webcamCount(){
        return this._webcamList.length
    }
    get selectedDeviceId(){
        return this._selectedDeviceId
    }
    getVideoInputs(e){
        return this._webcamList=[],
        e.forEach(e=>{
            "videoinput"===e.kind&&this._webcamList.push(e)
        }),
        1==this._webcamList.length&&(this._facingMode="user"),
        this._webcamList
    }
    getMediaConstraints(){
        var e={};
        return""==this._selectedDeviceId?e.facingMode=this._facingMode:e.deviceId={
            exact:this._selectedDeviceId
        },
        {video:e,audio:!1}
    }
    selectCamera(){
        for(let e of this._webcamList){
            if("user"==this._facingMode&&e.label.toLowerCase().includes("front")||"enviroment"==this._facingMode&&e.label.toLowerCase().includes("back")){
                this._selectedDeviceId=e.deviceId;
                break
            }
        }
    }
    flip(){
        this._facingMode="user"==this._facingMode?"enviroment":"user",
        this._webcamElement.style.transform="",
        this.selectCamera()
    }
    async start(e=!0){
        return new Promise((t,s)=>{
            this.stop(),
            navigator.mediaDevices.getUserMedia(this.getMediaConstraints())
            .then(i=>{
                this._streamList.push(i),
                this.info()
                .then(i=>{
                    this.selectCamera(),
                    e?this.stream()
                    .then(e=>{
                        t(this._facingMode)
                    })
                    .catch(e=>{
                        s(e)
                    })
                    :t(this._selectedDeviceId)
                })
                .catch(e=>{
                    s(e)
                })
            })
            .catch(e=>{
                s(e)
            })
        })
    }
    async info(){
        return new Promise((e,t)=>{
            navigator.mediaDevices.enumerateDevices()
            .then(t=>{
                this.getVideoInputs(t),
                e(this._webcamList)
            })
            .catch(e=>{
                t(e)
            })
        })
    }
    async stream(){
        return new Promise((e,t)=>{
            navigator.mediaDevices.getUserMedia(this.getMediaConstraints()).then(t=>{
                this._streamList.push(t),
                this._webcamElement.srcObject=t,
                "user"==this._facingMode&&(this._webcamElement.style.transform="scale(-1,1)"),
                this._webcamElement.play(),
                e(this._facingMode)
            })
            .catch(e=>{
                console.log(e),
                t(e)
            })
        })
    }
    stop(){
        this._streamList.forEach(e=>{e.getTracks().forEach(e=>{e.stop()})})
    }
    snap(){
        if(null!=this._canvasElement){null!=this._snapSoundElement&&this._snapSoundElement.play(),this._canvasElement.height=this._webcamElement.scrollHeight,this._canvasElement.width=this._webcamElement.scrollWidth;let e=this._canvasElement.getContext("2d");return"user"==this._facingMode&&(e.translate(this._canvasElement.width,0),e.scale(-1,1)),e.clearRect(0,0,this._canvasElement.width,this._canvasElement.height),e.drawImage(this._webcamElement,0,0,this._canvasElement.width,this._canvasElement.height),this._canvasElement.toDataURL("image/png")}throw"canvas element is missing"
    }
}


/* FUNÇÕES */ 

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