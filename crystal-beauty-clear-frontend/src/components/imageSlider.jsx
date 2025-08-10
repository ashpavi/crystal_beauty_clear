import { useState } from "react"

export default function ImageSlider(props) {
    const images = props.images
    const [activeImage, setActiveImage] = useState(images[0])
    

    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className=" w-[70%] aspect-square relative rounded-lg">
                <img src={activeImage} className="w-full  h-full object-cover rounded-lg"/>
                <div className="w-full h-[100px] backdrop-blur-2xl bottom-0 left-0 absolute hidden lg:flex justify-center items-center rounded-b-lg">
                    {
                        images.map(
                            (image, index) => {
                                return(
                                    <img key={index} src={image} className="h-full aspect-square  object-cover mx-[5px] rounded-lg cursor-pointer" 
                                    onClick={
                                        ()=> {
                                            setActiveImage(image)
                                        }
                                    } />
                                )
                            }
                        )
                    }

                </div>
                <div className="absolute w-full h-[100px] bottom-[-100px] flex lg:hidden justify-center items-center  ">
                        {
                        images.map(
                            (image, index) => {
                                return(
                                    <img key={index} src={image} className="h-[70px] aspect-square  object-cover mx-[5px] rounded-full cursor-pointer" 
                                    onClick={
                                        ()=> {
                                            setActiveImage(image)
                                        }
                                    } />
                                )
                            }
                        )
                    }
                </div>

            </div>
            
        </div>
    )
}