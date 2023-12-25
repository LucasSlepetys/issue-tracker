'use client';
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from '@radix-ui/react-icons';
import { Flex, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface props {
  text: string;
  orderByValue: string;
  className: string;
}

export function TableColumn({ text, orderByValue, className }: props) {
  const [isOrder, setIsOrder] = useState(true);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const searchParamsObject = Object.fromEntries(params.entries());

  const orderBy = searchParamsObject.orderBy;

  useEffect(() => {
    const order = searchParamsObject?.order;
    if (order) {
      setIsOrder(order === 'desc');
    }
  }, [searchParamsObject?.order]);

  const changeOrder = () => {
    setIsOrder(!isOrder);
  };

  return (
    <Table.ColumnHeaderCell className={className}>
      <Link
        href={{
          pathname: '/issues/view',
          query: {
            ...searchParamsObject,
            orderBy: orderByValue,
            order: isOrder ? 'asc' : 'desc',
          },
        }}
        passHref
        onClick={changeOrder}
      >
        <Flex align={'center'} gap={'2'}>
          <Text>{text}</Text>
          {orderBy === orderByValue &&
            (isOrder ? <DoubleArrowDownIcon /> : <DoubleArrowUpIcon />)}
        </Flex>
      </Link>
    </Table.ColumnHeaderCell>
  );
}
