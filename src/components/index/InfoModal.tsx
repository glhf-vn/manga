import type { InfoModalProps } from "@data/index.types";

import { DateTime } from "luxon";

import Image from "next/image";
import Link from "next/link";
import { BsInfoCircleFill } from "react-icons/bs";
import { Dialog } from "@headlessui/react";

import { VND } from "@data/config";

import Button from "@components/Button";
import Cover from "@components/Cover";
import Modal from "@components/Modal";

const InfoModal = ({ isOpen, onClose, data }: InfoModalProps) => {
  if (data)
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col-reverse sm:flex-row">
          <div className="w-full sm:max-w-[250px]">
            <Cover
              entry={data}
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 25vw, 15vw"
            />
          </div>
          <div className="flex-1 p-6 sm:pt-9">
            <div className="flex h-full flex-col justify-between">
              <div>
                <Dialog.Title
                  as="div"
                  className="mb-3 font-kanit text-2xl font-bold lg:text-3xl"
                >
                  {data.name}
                </Dialog.Title>
                <Dialog.Description>
                  {data.date && (
                    <span>
                      <b>Ngày phát hành</b>:{" "}
                      {DateTime.fromISO(data.date).toLocaleString(
                        DateTime.DATE_SHORT
                      )}
                    </span>
                  )}
                  <br />
                  {data.edition && (
                    <>
                      <b>Phiên bản</b>: {data.edition}
                      <br />
                    </>
                  )}
                  <br />
                  <b>Nhà xuất bản/phát hành</b>: {data.publisher.name}
                  <br />
                  <b>Giá dự kiến</b>: {VND.format(data.price)}
                </Dialog.Description>
              </div>
              <div className="mt-6">
                {data.serie_id && (
                  <Link
                    href={`/license/${data.serie_id}`}
                    className="inline-block h-fit rounded-xl bg-zinc-200 py-2 px-3 transition-all duration-150 ease-linear hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <BsInfoCircleFill />
                      Thông tin trọn bộ
                    </span>
                  </Link>
                )}
                <br />
                <div className="mt-3">
                  {!data.digital ? (
                    <>
                      <Button
                        className="bg-[#c92127] text-zinc-50"
                        href={`https://fahasa.com/catalogsearch/result/?q=${data.name}`}
                      >
                        <Image
                          src="/img/fahasa-logo.png"
                          alt="FAHASA"
                          width={20}
                          height={20}
                        />
                        FAHASA
                      </Button>{" "}
                      <Button
                        className="bg-[#1a94ff] text-zinc-50"
                        href={`https://tiki.vn/search?q=${data.name}`}
                      >
                        <Image
                          src="/img/tiki-logo.png"
                          alt="Tiki"
                          width={30}
                          height={20}
                        />
                        TIKI
                      </Button>{" "}
                      <Button
                        className="bg-white text-[#ff6633]"
                        href={`https://shopee.vn/search?keyword=${data.name}`}
                      >
                        <Image
                          src="/img/shopee-logo.png"
                          alt="Shopee"
                          width={15}
                          height={20}
                        />
                        Shopee
                      </Button>{" "}
                      <Button
                        className="bg-[#5d8650] text-zinc-50"
                        href={`https://hikaru.vn/search?type=product&q=${data.name.replace(
                          / - /g,
                          " "
                        )}`}
                      >
                        <Image
                          src="/img/hikaru-logo.png"
                          alt="Hikaru"
                          width={28}
                          height={20}
                        />
                        Hikaru
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="bg-[#eb2f3b] text-zinc-50"
                      href="https://thuvienkimdong.vn/"
                    >
                      <Image
                        src="/img/kd-comics-logo.jpg"
                        alt="Kim Dong Comics"
                        width={20}
                        height={20}
                      />
                      Kim Đồng Comics
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex animate-pulse flex-col-reverse sm:flex-row">
        <div className="h-[600px] w-full bg-zinc-200 dark:bg-zinc-700 sm:h-[400px] sm:max-w-[250px]"></div>
        <div className="flex-1 p-6 sm:pt-9">
          <div className="flex h-full flex-col justify-between">
            <div>
              <Dialog.Title className="mb-3 font-kanit text-2xl font-bold lg:text-3xl">
                <div className="h-6 w-full rounded bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="mt-3 h-6 w-2/3 rounded bg-zinc-300 dark:bg-zinc-700"></div>
              </Dialog.Title>
              <Dialog.Description>
                <div className="mt-6 h-5 w-2/3 rounded bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="mt-6 h-5 w-2/3 rounded bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="mt-3 h-5 w-2/3 rounded bg-zinc-300 dark:bg-zinc-700"></div>
              </Dialog.Description>
            </div>
            <div className="mt-6">
              <div className="mt-1 flex gap-2">
                <Button className="bg-[#c92127] text-zinc-50">
                  <Image
                    src="/img/fahasa-logo.png"
                    alt="FAHASA"
                    width={107}
                    height={20}
                  />
                </Button>
                <Button className="bg-[#1a94ff] text-zinc-50">
                  <Image
                    src="/img/tiki-logo.png"
                    alt="Tiki"
                    width={30}
                    height={20}
                  />
                </Button>
                <Button className="bg-[#ff6633] text-zinc-50">
                  <Image
                    src="/img/shopee-logo.png"
                    alt="Shopee"
                    width={59}
                    height={20}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
