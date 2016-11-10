/**
 * Created by milk on 2016/11/10.
 */
module eui {
    export module Alert{
        export function Show(content:string):void{
            Core.AlertLayer.Show(content);
        }
    }
}