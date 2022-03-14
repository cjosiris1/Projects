
var getElementsByClassName = function(className){
    var nodeList = [];
    
    function check(node){
        if(node.classList.contains(className)){
            nodeList.push(node);
        }
        
        for(var i = 0; i < node.children.length; i++){
            check(node.children[i]);
        }
    }
    
    check(document.body);
    
    return nodeList;
};