"use client"
import { Gitlab, Search } from '@gitbeaker/rest';
import { Card, LineChart, Text } from '@tremor/react';
import { Select } from 'antd';
import { useEffect, useState } from 'react';

const api = new Gitlab({
    host: "http://ias-01.redbus.in",
    token: "yppjNxHQQoCx2RR4Dq28",
});

// Listing users

// Or using Promise-Then notation

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'indigo',
    'purple',
    'pink', // Add more colors if the string array is longer
  ];
// export function GetProjects() {
//     api.Projects.all().then((projects) => {
//         console.log(projects);
//     });
//     return (<></>)
// }

export function GetUsers() {
    console.log("Users are - ");
    api.Users.all().then((user) => {
        console.log(user);
    });
    return (<></>)
}

export function GetBranches({ projectId, callback }) {
    const [branches, setbranches] = useState(null)
    const onChange = (value) => {
        console.log(`selected ${value}`);
        callback(value)
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    api.Branches.all(projectId).then((br) => {
        const y = []

        br.forEach((branch) => {
            var g = {
                value: branch.name,
                label: branch.name
            }
            y.push(g)
        })
        setbranches(y)
    });


    return (<Card>
        <Select
            showSearch
            placeholder="Select Branch "
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={branches}
        />
    </Card>)
}


export function GetProjects({ groupid, callback }) {
    const [projects, setprojects] = useState(null)
    const onChange = (value) => {
        console.log(`selected ${value}`);
        callback(value)
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    api.Projects.all(groupid).then((br) => {
        const y = []
console("Pojects of group ", br)
        // br.forEach((branch) => {
        //     var g = {
        //         value: branch.name,
        //         label: branch.name
        //     }
        //     y.push(g)
        // })
        // setbranches(y)
    });


    return (<Card>
        {/* <Select
            showSearch
            placeholder="Select Branch "
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={branches}
        /> */}
    </Card>)
}



export function GetCommitsOfBranch({ projectId }) {

    
    
    const[f,setfinal] = useState([])
   const [p,setpayload] =useState([])
   const [cat,setcat] =useState([])
   const colorArray = [];
   const[selectedkey,setselectedkey] = useState(null)


   function convertToDate(dateStr) {
    return new Date(dateStr);
  }

  useEffect(()=>{
    var t  = mineProjectCommitDat(projectId)
setpayload(...p,t)    
  },[])

 
   var prefinal = {}
   var final = []
   var mySet = new Set()
   var users = new Set()
   var userFinal = []
   
   if(p.length > 0) {
       
   
   p.forEach(d => {
       Object.keys(d).forEach(key => {
           mySet.add(key)
   
           Object.keys(d[key]).forEach(m => { 
               // console.log(m ,key,d[key][m])
               users.add(d[key][m][0].committer_name)

               //  d[key][m].forEach(i=> {
               //     sum = sum + i.stats.total
               // })
            //    sum = d[key][m].length  
               var  j = {}
               j[key] = d[key][m]
               prefinal[m] = prefinal[m]   ||  []
             prefinal[m].push(j)
   
           })
       })
   })
   
   Object.keys(prefinal).forEach(date => {
       var t = {
           "date" : date
       }
       var u = {
        "date" : date
       }
       prefinal[date].forEach(f => {
           Object.keys(f).forEach(data => {
               Array.from(mySet).forEach((e) => {
                   if(e == data) {
                       t[e] = f[data].length
                       
                   }else{
                       t[e] = 0
                   }

                   var sumoflines = 0 

                Array.from(users).forEach((e) => {
                    if(e == f[data][0].committer_name){
                        f[data].forEach((o)=> sumoflines=sumoflines+o.stats.total)
                        u[e] = sumoflines
                    }else{
                        u[e] =0
                    }
                })
               })
               
             
            })
   
       })
       userFinal.push(u)
       final.push(t)
   })
   
   final.sort((a, b) => convertToDate(a.date) - convertToDate(b.date));
   
   }
   

// useEffect(()=>{
//     var t  = mineProjectCommitDat(projectId)
//     console.log("inside effect")
//     setpayload(...p,t)
//     // var y = prepareFinal(t)

//     // setfinal(...f,y)
//     // setcat(...cat,y.cat)

// },[])

// var y = prepareFinal(p)
// console.log(y)


  
const colorListLength = colors.length;
const stringArrayLength = Array.from(mySet).length;
  for (let i = 0; i < stringArrayLength; i++) {
    // Calculate a color index based on the string's position and array length
    const colorIndex = i % colorListLength;
  
    // Use the calculated index to get a color from the colors array
    colorArray.push(colors[colorIndex]);
  }

// console.log("fetch data :" ,p)
// console.log("prefinal data :" ,prefinal)
// console.log("Final data: ",final)
// console.log("users data: ",users)
// console.log("users final: ",userFinal)


// console.log(colorArray)


    return (
        <div className='flex flex-col gap-2'>
            <Text>
                Branches of the Project
            </Text>
            <LineChart
      className="h-80 min-w-80"
      data={final}
      index="date"
      categories={Array.from(mySet)}
      colors={colorArray}
      onValueChange={(v) =>setselectedkey(v.categoryClicked)}
    />
   {/* <GetBranchSpecific data={p} selectedkey={selectedkey}/> */}

   <Text>
                Users of the Project
            </Text>
   <LineChart
      className="h-80 min-w-80"
      data={userFinal}
      index="date"
      categories={Array.from(users)}
      colors={colorArray}
      onValueChange={(v) =>setselectedkey(v.categoryClicked)}
    />
        </div>
    

  
    )
} 

function GetBranchSpecific ({data,selectedkey}) {
    console.log(data,selectedkey)

return(<></>)
}
function mineProjectCommitDat (projectId) {
    const lastMonthStart = new Date();
    lastMonthStart.setDate(1);
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    var payloadforgraph  = []

    api.Branches.all(projectId).then(br => {
        var datewisedict = {}
        br.forEach((branch) => {
            var branchwisecommit = {}
     
            api.Commits.all(projectId, { refName: branch.name, withStats: true, since: lastMonthStart }).then((commits)=>{
             if(commits.length > 0 ){
                 const commitsByDate = commits.reduce((acc, commit) => {
                     const commitDate = commit.committed_date.slice(0, 10); // Extract YYYY-MM-DD
                     acc[commitDate] = acc[commitDate]   ||  []; // Initialize if date doesn't exist
                     acc[commitDate].push(commit)
                     return acc;
                 }, {});

                
                 branchwisecommit[branch.name] = commitsByDate
         
                 // for (const date in commitsByDate) {
                 //     var t = {
                 //         date : date,
                         
                 //     }
                 //     commitsByDate[date].forEach(commit => {
                 //        t[commit.branch] = t[commit.branch] + commit.total || commit.total 
                 //     }); // Print shortened commit SHA and message
                 //     payloadforgraph.push(t)
                 // }
                 payloadforgraph.push(branchwisecommit)

             }
            
            })
             
         })
    })
    return payloadforgraph
}


// function prepareFinal(p) {
//     console.log("inside" , p)

//     var prefinal = {}
//     var final = []
//     var mySet = new Set()
    
//     if(p.length > 0) {
        
    
//     p.forEach(d => {
//         Object.keys(d).forEach(key => {
//             mySet.add(key)
    
//             Object.keys(d[key]).forEach(m => { 
//                 // console.log(m ,key,d[key][m])
//                 var sum = 0 
//                 //  d[key][m].forEach(i=> {
//                 //     sum = sum + i.stats.total
//                 // })
//                 sum = d[key][m].length  
//                 var  j = {}
//                 j[key] = sum
//                 prefinal[m] = prefinal[m]   ||  []
//               prefinal[m].push(j)
    
//             })
//         })
//     })
    
//     Object.keys(prefinal).forEach(key => {
//         var t = {
//             "date" : key
//         }
//         prefinal[key].forEach(f => {
//             Object.keys(f).forEach(data => {
//                 Array.from(mySet).forEach((e) => {
//                     if(e == data) {
//                         t[e] = f[data]
//                     }else{
//                         t[e] = 0
//                     }
//                 })
                
              
//              })
    
//         })
//         final.push(t)
    
    
//     })
    
//     final.sort((a, b) => convertToDate(a.date) - convertToDate(b.date));
    
//     }
//     console.log(final)
// return final      
// }

