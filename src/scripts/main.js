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
                #placeholder={{attr.placeholder=物品名称}}
                %value = {{inputVal}}
            >button.button
                .追加
                @click = add
    >section.container
        >ul
            +item
`({
    $data:{
        items:[]
    },
    $methods:{
        add({state}){
            let value = state.$data.inputVal
            state.$data.items.push(value)
            state.item.push(new item({$data:{data:value}}))
            console.log(state.$data.items)
        }
    }
});

const item = t`
>li
    .{{data}}
`;

gun.get('list').on(function(data, key){

});

list.$mount({target: document.body});

