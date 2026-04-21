import Image from "next/image";
import ContectForm from "../form/contectform";

export default function Footer() {
  return (
    <div className='bg-muted/30 pt-25 sm:pt-10 mt-20 sm:mt-20 px-4 sm:px-10 lg:px-24 xl:px-40 pb-20'>
      <div className='flex justify-between lg:items-center max-md:flex-col gap-10'>
        <div className='space-y-5 text-sm text-muted-foreground'>
          <Image src="/ischool.png" alt="logo" width={40} height={40}/>
          <p className='max-w-md'>Building a smarter future through human-centric technology and academic rigor.</p>

          <ul className='flex flex-rows gap-5 '>
            <li><a className='hover:text-primary hover:border-b hover:border-gray-400' href="#hero">Home</a></li>
            <li><a className='hover:text-primary hover:border-b hover:border-gray-400' href="#Services">Services</a></li>
            <li><a className='hover:text-primary hover:border-b hover:border-gray-400' href="#Our work">Our work</a></li>
            <li><a className='hover:text-primary hover:border-b hover:border-gray-400' href="#Testimonial">Testimonial</a></li>
          </ul>
        </div>
        <div className='text-muted-foreground'>
          <h3 className='font-semibold'>Subscribe to our newsletter</h3>
          <p className='text-sm mt-2 mb-6'>The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div className='flex mt-2 mb-6 gap-2'>
            <ContectForm/>
          </div>
        </div>
      </div>
      <hr className='border-border my-6'/>

      {/* footer bottom */}
      <div className='pb-6 text-sm text-muted-foreground flex justify-center sm:justify-between gap-4 flex-wrap'>
        <p className='hover:border-b'>© 2024 ISCHOOL INTERNATIONAL. ALL RIGHTS RESERVED.</p>
        <div className='flex items-center gap-4'>
          <Image className='hover:scale-105 duration-200 hover:border-2 rounded-full' src='/facebook_icon.svg' alt="facebook" width={20} height={20}/>
          <Image src="/twitter_icon.svg" alt="twitter" width={20} height={20} />
          <Image src="/instagram_icon.svg" alt="instagram_" width={20} height={20} />
          <Image src="/linkedin_icon.svg" alt="linkedin" width={20} height={20} />
        </div>
      </div>
    </div>
  )
}