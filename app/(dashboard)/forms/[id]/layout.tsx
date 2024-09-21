
export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return ( <div className='flex w-full flex-col flex-grow mx-auto'>
            { children }
    </div> )
  }
 

