import React, { useEffect, useState } from "react";
import Nav from "../Home/Nav/Nav";
import axios, { all } from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import "./sendPdf.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function SendPDF() {
  const [title, setTitle] = useState("");
  const [file, saveFile] = useState("");
  const [allpdf, setAllPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    try {
      const result = await axios.get("http://localhost:5000/getFile");
      console.log(result.data.data);
      setAllPdf(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const submitPdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);

      if (result.data.status === 200) {
        alert("Upload Successful!");
        getpdf();
      } else {
        alert("Upload failed, please try again!");
      }
    } catch (error) {
      console.log("Error Uploading PDF: " + error.message);
      alert("An error occurred during the upload. Please try again!.");
    }
  };

  const ShowPdf = (pdf) => {
    setPdfFile(`http://localhost:5000/files/${pdf}`);
  };

  return (
    <div className="send-pdf-container">
      <Nav />
      <h1 className="send-pdf-title">Send PDF</h1>
      <form onSubmit={submitPdf} className="send-pdf-form">
        <label className="form-label">PDF Title</label>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />

        <label className="form-label">Select PDF File</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => saveFile(e.target.files[0])}
          required
          className="file-input"
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <div className="pdf-details-container">
        <h4>PDF Details</h4>
        {allpdf &&
          allpdf.map((data) => (
            <div key={data._id} className="pdf-item">
              <h1 className="pdf-title">Title: {data.title}</h1>
              <button className="view-btn" onClick={() => ShowPdf(data.pdf)}>
                Show PDF
              </button>
            </div>
          ))}
      </div>
      <PdfComp pdfFile={pdfFile} />
    </div>
  );
}

export default SendPDF;
