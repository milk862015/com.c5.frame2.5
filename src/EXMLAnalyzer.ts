/**
 * Created by milk on 15/10/8.
 */
class EXMLAnalyzer extends RES.TextAnalyzer{
    constructor(){
        super();
    }

    public analyzeData( resItem:RES.ResourceItem,data:any ):void{
        var name:string = resItem["name"];
        if( this.fileDic[name] || !data ){
            return
        }
        var clzz:any = EXML.parse(data);
        this.fileDic[name] = clzz;
    }
}