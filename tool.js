
exports.print = function(){
    function excep(){
        try{
            throw new Error('');
        }catch(e){
            var arrErr = e.stack.split('\n');
            var source = '';
            for(var i= 0, len = arrErr.length; i < len; i++){
                if(arrErr[i].indexOf('Object.<anonymous>') > 0){
                    source = arrErr[i];
                    break;
                }
            }
            source = source.slice(source.indexOf('(') - 1).slice(source.indexOf('js-data-structure-algorithms') + 4);
            return source;
        }
    }
    console.log(excep(), '：',...arguments);
}
