// Tiny stack VM, ISA v1 (kit ISA.md + vm.mjs). T packs imm+5*pops+20*pushes per opcode byte.
const F=require('fs')
const I=process.env.MAKEFUN_INPUT_DIR||'/input'
const O=process.env.MAKEFUN_OUTPUT_DIR||'/output'
const T="!69&NSgl        ???????:???:??? ???             #((#!           :+              &&5&"
for(let d of F.readdirSync(I).sort()){
let p=F.readFileSync(I+'/'+d+'/program.bin'),u=F.readFileSync(I+'/'+d+'/input.bin'),D=[],s=0,C=[],c=0,M=new Int32Array(256),o=[],l=0,g=0,pc=0,t=0,e=0,n=p.length
for(;;){
if(t==1e6){e=10;break}
if(pc<0||pc>=n){e=9;break}
let k=p[pc],v=T.charCodeAt(k)-33
if(k>83||v<0){e=5;break}
let m=v%5,A=(v/5|0)%4,B=v/20|0
if(pc+m>=n){e=9;break}
t++
let x=pc+1+m
if(s<A){e=2;break}
if(s-A+B>256){e=3;break}
pc=x
if(k==0)break
else if(k==1)D[s++]=(p[x-1]<<24)>>24
else if(k==2)D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24
else if(k==3)s--
else if(k==4)D[s]=D[s-1],s++
else if(k==5){let a=D[s-1];D[s-1]=D[s-2];D[s-2]=a}
else if(k==6)D[s]=D[s-2],s++
else if(k==7){let a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a}
else if(k==23)D[s-1]=-D[s-1]|0
else if(k==27)D[s-1]=~D[s-1]
else if(k>15&&k<35&&k!=23&&k!=27){
let b=D[s-1],a=D[s-2],r
if(k==16)r=a+b|0
else if(k==17)r=a-b|0
else if(k==18)r=Math.imul(a,b)
else if(k==19){if(!b){e=4;break}r=(a/b)|0}
else if(k==20){if(!b){e=4;break}r=(a%b)|0}
else if(k==21){if(!b){e=4;break}r=Math.floor((a>>>0)/(b>>>0))|0}
else if(k==22){if(!b){e=4;break}r=(a>>>0)%(b>>>0)|0}
else if(k==24)r=a&b
else if(k==25)r=a|b
else if(k==26)r=a^b
else if(k==28)r=a<<b
else if(k==29)r=a>>b
else if(k==30)r=(a>>>b)|0
else if(k==32)r=a==b?1:0
else if(k==33)r=a<b?1:0
else r=(a>>>0)<(b>>>0)?1:0
s-=2;D[s++]=r
}
else if(k>47&&k<51){
let j=((p[x-2]|p[x-1]<<8)<<16)>>16,w=1
if(k!=48){let q=D[--s];w=k==49?q==0:q!=0}
if(w)pc=x+j
}
else if(k==51){
if(c==64){e=7;break}
C[c++]=x;pc=p[x-2]|p[x-1]<<8
}
else if(k==52){
if(!c){e=8;break}
pc=C[--c]
}
else if(k==64){
let a=D[s-1]
if(a<0||a>255){e=6;break}
D[s-1]=M[a]
}
else if(k==65){
let a=D[s-1],w=D[s-2]
if(a<0||a>255){e=6;break}
s-=2;M[a]=w
}
else if(k==80){
let q=String(D[s-1])
if(l+q.length>65536){e=11;break}
s--
for(let i=0;i<q.length;i++)o[l++]=q.charCodeAt(i)
}
else if(k==81){
if(l+1>65536){e=11;break}
o[l++]=D[--s]&255
}
else if(k==82)D[s++]=g<u.length?u[g++]:-1
else{e=D[--s]&255;break}
}
F.mkdirSync(O+'/'+d,{recursive:true})
F.writeFileSync(O+'/'+d+'/stdout.bin',Buffer.from(o))
F.writeFileSync(O+'/'+d+'/exit.txt',e+'\n')
}
