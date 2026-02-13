import style from './posts.module.css'
interface ResponseProps {
    id: number
    title: string
    body: string
    userId: number
}

interface ResponseData {
    posts: ResponseProps[]
}

export default async function Posts() {
    const response = await fetch('https://dummyjson.com/posts')
    const data: ResponseData = await response.json()

    return (
        <div>
            <h1 className={style.title}>Todos os Posts</h1>
            <ul>
                {
                    data.posts.map(item => (
                        <li className={style.itemList} key={item.id}>{item.title}</li>
                    ))
                }
            </ul>
        </div>
    )
}