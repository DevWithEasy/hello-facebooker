import axios from 'axios';
export default function User({users}){
    console.log(users)
    return (
        <div className="">User</div>
    )
}

export async function getServerSideProps(){
    const users = await axios.get('http://localhost:3000/api/user')
    console.log(users)
    return{
        props:{
            
        }
    }
}