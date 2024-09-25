import React, { useEffect, useState } from 'react'

const ProductData = () => {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const fetchData = async () => {
        try {
            let response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
            let data = await response.json()
            if (data && data.products) {
                setProducts(data.products)
                setTotalPages(Math.ceil(data.total / 10));
                console.log(products);
            }
        } catch (error) {
            console.log(error, 'This error occured');
        }
    }

    useEffect(() => {
        fetchData();
    }, [page])


    const selectedPageHandle = (selectedPage) => {
        if(selectedPage >= 1 && 
            selectedPage <= totalPages &&
            selectedPage != page
        )
        setPage(selectedPage)
    }
    
    return (
        <div className='flex flex-col items-center'>
            {products.length > 0 && <div className="products flex flex-wrap min-w-fit justify-center m-4">
                    {products.map((item)=>(
                        <div className="card rounded-xl min-h-fit w-[25vw] p-1 m-2 flex flex-col items-center  cursor-pointer bg-gray-300" key={item.id}>
                            <img className='h-[26vh] w-fit' src={item.thumbnail} alt={item.title} />
                            <div className="details text-center">
                                <p className='font-bold'>{item.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {
                products.length > 0 && <div className="pagination my-2 p-2 ">
                    <span className={`${page == 1 ? 'hidden' : ''} cursor-pointer`} onClick={()=> selectedPageHandle(page - 1)}>⏮️</span>
                    {
                        [...Array(totalPages)].map((_, i)=>{
                            return <span onClick={()=> selectedPageHandle(i + 1)} className={`mx-1 p-3 border border-black font-bold cursor-pointer ${page === i + 1 ? 'bg-gray-200' : ''}`} key={i}>{i + 1}</span>
                        })
                    }
                    <span className={`cursor-pointer ${page < totalPages ? '' : 'hidden'}`} onClick={()=> selectedPageHandle(page + 1)}>⏭️</span>
                </div>
            }
        </div>
    )
}

export default ProductData