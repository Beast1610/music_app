import React from 'react'


const Footer = () => {
    return (
        <div><footer class="p-4 bg-black md:p-8 lg:p-10 ">
            <div class="m-auto max-w-screen-xl text-center flex flex-col items-center">
                <a href="#" class="flex justify-center items-center text-2xl font-semibold text-white">
                <img src="loungifylogo3.png" style={{ height: '60px' }} className="mx-auto"/>
                    
                </a>
                <p class="my-6 text-white">Discover a world of Excitement and fun with Loungify, Your Online Oasis For Relaxation & Tranquility</p>
                <span class="text-sm text-white ">© 2020-2024 <a href="#" class="hover:underline">Loungify™</a>. All Rights Reserved.</span>
            </div>
        </footer></div>
    )
}

export default Footer