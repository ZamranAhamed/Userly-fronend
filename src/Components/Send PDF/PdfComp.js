import React from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import "./pdfComp.css";

function PdfComp(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div className="pdf-viewer-container">
      {props.pdfFile ? (
        <Document
          file={props.pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          className="pdf-document"
        >
          {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
            <Page
              key={page}
              pageNumber={page}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="pdf-page"
            />
          ))}
        </Document>
      ) : (
        <p className="file-not-found">PDF File Not Available</p>
      )}

      {numPages && (
        <p className="pdf-page-info">
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
}

export default PdfComp;
