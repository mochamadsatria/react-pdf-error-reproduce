"use client";

import { getAuth } from "firebase/auth";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import "./pdf.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { useState } from "react";
import { firebaseApp } from "./firebase";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

type PDFFile = string | File | null;

const auth = getAuth(firebaseApp);

export default function Home() {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <>
      <div className="pdf">
        <div className="pdf__container">
          <div className="pdf__container__document">
            <Document
              file={
                "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/pdfs/learning/helloworld.pdf"
              }
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              onLoadError={console.error}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </div>
      </div>
    </>
  );
}
