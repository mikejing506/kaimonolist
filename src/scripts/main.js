'use strict';
import { create, t, inform, exec, bundle, setParser, parseEft, version } from 'ef.js'
import Gun from 'gun';

const gun = Gun()

const list = t`
>main.wrapper
    >section.container
        >form
            >fieldset
                >input
                    %type={{attr.type=text}}
                >button.button
                    .追加
    >section.container
        >ul
            >li
`;

gun.get('list').put({
    item:{
        name:"",
        time:Date.now(),
        weight:""
    },
  });
  
  gun.get('list').on(function(data, key){
    console.log("update:", data);
    console.log("key:", key);
  });

(new list({$data:{Data:"oao"}})).$mount({target: document.body});