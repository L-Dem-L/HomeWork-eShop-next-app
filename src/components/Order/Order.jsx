import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import order from "./order.png"

const Order = () => {
  return (
    <div>
        <Link href="/cart"><Image src={order}/></Link>
    </div>
  )
}

export default Order