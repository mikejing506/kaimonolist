'use strict';
import { create, t, inform, exec, bundle, setParser, parseEft, version } from 'ef.js'
import Gun from 'gun';

const gun = Gun()

const list = new t`
>main.wrapper
    >section.container
        >fieldset
            >input
                %type={{attr.type=text}}
                #required
                #placeholder={{attr.placeholder=物品名称}}
                %value = {{inputVal}}
            >button.button
                .追加
                @click = add
    >section.container
        >ul
            +item
`({
    $methods:{
        add({state}){
            let _ = state.$data.inputVal
            gun.get("lists").get("list").once((data)=>{
                if(data){
                    
                    gun.get("lists").put({
                        list:data + ',' + _
                    })
                }else{
                    gun.get("lists").put({
                        list:[_].join()
                    })
                }
            })
        }
    }
});

const item = t`
>li
    >button.button-outline
        .移除
        @click = remove:{{id}}
    .{{data}}
`;

gun.get('lists').on(function(data, key){
    list.item.empty()
    let _items = data.list.split(',')
    if(_items != "")list.item = _items.map((v,i)=>new item({$data:{data:v,id:i},$methods:{remove(id){_items.splice(id.value,1);gun.get("lists").put({list:_items.join()})}}}))
});

list.$mount({target: document.body});

