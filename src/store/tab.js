import Cookie from "js-cookie"
export default{
    state:{
        isCollapse:false,//用于控制菜单的展开和收起
        tabsList:[
            {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
              }
        ],//面包屑的数据
        Menu:[]
    },
    mutations:{
        //定义修改菜单展开和收齐的方法
        CollapseMenu(state){
            state.isCollapse=!state.isCollapse
        },
        //更新面包屑数据
        selectMenu(state,val){
            if(val.name!=='name'){
                const index=state.tabsList.findIndex(item =>item.name===val.name)
                if(index===-1){
                    state.tabsList.push(val)
                }
            }
        },
        closeTag(state,item){
            // console.log(item)
            const index=state.tabsList.findIndex(val =>val.name===item.name)
            
            state.tabsList.splice(index,1)
            
        },
        // 设置Menu的数据
        setMenu(state,val){
            state.Menu=val
            Cookie.set('meau',JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state,router){
            // console.log(router)
            if(!Cookie.get('meau')) return
            const meau=JSON.parse(Cookie.get('meau'))
            state.Menu=meau
            const arrMenu=[]
            meau.forEach(item => {
                if(item.children){
               item.children=item.children.map(item =>{
                        item.component =() => import(`../pages/${item.url}`)
                        return item
                    })
                    arrMenu.push(...item.children)
                }else{
                    item.component =() => import(`../pages/${item.url}`)
                    arrMenu.push(item)
                }
            });
            arrMenu.forEach(item =>{
                router.addRoute('Main',item)
            })
        }
    }
}