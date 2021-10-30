function test(){
    var i,j;
    valid=true;
    let sh=["","",""];
    let neg=[false,false,false];
    let negs=[false,false,false];
    let op=["","",""];
    for(i=1;i<=3;i++) {
        let o1=document.getElementById("s"+i+"o1").value ;
        let o2=document.getElementById("s"+i+"o2").value;
        let o3=document.getElementById("s"+i+"o3").value; 
        let o4= document.getElementById("s"+i+"o4").value ;
        if(o1=="n") {
            o1="a";
            o3=(o3=="i" ? "n": "i");
        }
        op[i-1]=">";
        if(o1=="s") op[i-1]="I";    
        sh[i-1]="C<sub>"+o2+"</sub>";
        if(op[i-1]=="I") sh[i-1]+=" &#8745; ";
        else sh[i-1]+= "<img src='rarr.svg' class='rarr'/>";
        if(o3=="n") sh[i-1]+="<img src='no.svg' class='no'/>C<sub>"+o4+"</sub>";
        else sh[i-1]+="&nbsp;C<sub>"+o4+"</sub>";
        op[i-1]=o2+op[i-1]+o4;
        negs[i-1]=(o3=="n");
        if(negs[i-1]) op[i-1]+="/";
        document.getElementById("s"+i).innerHTML="&nbsp;S<sub>"+i+"</sub> = ("+sh[i-1] +")&nbsp;";
    }
    for(i=1;i<=3;i++) {
        neg[i-1]=false;
        for(j=0;j<3;j++) {
            let op1=op[j];
            if(negs[j] && op1[2]==i)
                neg[i-1]=true;
        }
    }
    console.log(sh);
    console.log(op);
    console.log(neg);
    let result=document.getElementById("results");
    var table="<table border='0' cellpadding='1' cellspacing='0' class='tab'>";
    table+="<tr>";
    for(i=1;i<=3;i++) table+="<td>&nbsp;&nbsp;C<sub>"+i+"</sub>&nbsp;&nbsp;</td>";
    for(i=1;i<=3;i++)  if(neg[i-1]) table+="<td><img src='no.svg' class='no'/>C<sub>"+i+"</sub>&nbsp;&nbsp;</td>";
    for(i=1;i<=3;i++) table+="<td>&nbsp;S<sub>"+i+"</sub> = ("+sh[i-1] +")&nbsp;</td>";
    table+="<td>&nbsp;S<sub>1</sub> &#8745; S<sub>2</sub>&nbsp;</td>";
    table+="<td></td><td class='last'>&nbsp;S = (S<sub>1</sub> &#8745; S<sub>2</sub>) <img src='rarr.svg' class='rarr'/> S<sub>3</sub>  &nbsp;</td>";
    table+="</tr>";

    for(j=0;j<=7;j++) {
        let f=j.toString(2).padStart(3,'0');
        table+="<tr>";

        for(i=1;i<=3;i++) table+="<td> "+f[i-1]+"</td>";
        for(i=1;i<=3;i++) if(neg[i-1])  table+="<td> "+(f[i-1] == 0 ? 1 : 0 ) +"</td>";
        let s1r=[0,0,0];
        for(i=1;i<=3;i++) {
            let opi=op[i-1];
            let vc1=1*opi[0];
            let vc2=1*opi[2];
            let dbg="="+opi;
            let c1=f[vc1-1];
            let c2=opi.length==4 ?  ( f[vc2-1]==0 ?1:0) : f[vc2-1];
            dbg=dbg + "~"+c1+","+c2+":"+neg[vc1]+","+neg[vc2];
            if(opi[1]==">") {
                s1r[i-1]=1;
                if(c1==1 && c2==0) s1r[i-1]=0;
            }

            else if (opi[1]=="I") {
                s1r[i-1]=0;
                if(c1==1 && c1==c2) s1r[i-1]=1;
            } 
            else s1r[i-1]=20;
            table+="<td> "+s1r[i-1]+" </td>";
        }
        let s1Is2=0;
        if(s1r[0] == 1  && s1r[0]==s1r[1]) s1Is2=1;
        table+="<td>"+s1Is2+"</td>";
        let s=1;
        if(s1Is2==1 && s1r[2]==0) s=0;
        if(s==0) {  
            table+="<td></td><td class='last' style='color:red;'>"+s+"</td>";
            valid=false;
        }
        else
            table+="<td></td><td class='last' >"+s+"</td>";
         
        table+="</tr>";    

    }
    table+="</table>";

    if(valid )table+="<h3>Given that each element of the column that corresponds to <i>S</i> is a '1', we conclude that <i>S</i> = <b>U</b> (universal set). Therefore, the categorical syllogism considered is valid.</h3>";
    else     table+="<h3> Given that in the column of <i>S</i>there is a membership value equal to zero (0), <i>S</i> &ne; <b>U</b>. Therefore, the categorical syllogism considered is <u>not</u> valid.</h3>";
    result.innerHTML=table;
}
