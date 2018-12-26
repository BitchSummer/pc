let type={
    getHeader:function(list){
        var ary=[]
        for(let d of list){
            if(d.parentId==0){
                ary.push({title:d.alias})
            }
        }
        return ary
    },
    getTree(ary,node){
        var list=[]
        if(node.id){
            for(let d of ary){
                if(d.parentId==node.id){
                    list.push({
                        name:d.alias,
                        router:'/'+d.code,
                        id:d.id
                    })
                }
            }
        }else{
            for(let d of ary){
                if(d.parentId==0){
                    list.push({
                        name:d.alias,
                        router:'/'+d.code,
                        id:d.id
                    })
                }
            }
        }
        if(list&&list.length>0){
            node.chlid=list
            for(let node of list){
                node = this.getTree(ary,node)
            }
        }
        return node
    },
}
export default type