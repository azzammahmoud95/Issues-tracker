"use client";

import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align={`center`} gap={`2`} justify={`center`}>
      <Text size={`2`}>
        {currentPage} of {pageCount}{" "}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <AiOutlineDoubleLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <AiOutlineArrowLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <AiOutlineArrowRight />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <AiOutlineDoubleRight />
      </Button>
    </Flex>
  );
}

export default Pagination;
