"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher";
import { X, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Search, RefreshCw, Save, AlertTriangle, CheckCircle } from "lucide-react";

// --- Reusable Components ---

const Popup = ({ type, title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div className={`bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center border-t-8 ${type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
      {type === 'success' ? 
        <CheckCircle size={48} className="text-green-500 mb-4 mx-auto" /> : 
        <AlertTriangle size={48} className="text-red-500 mb-4 mx-auto" />
      }
      <h3 className={`text-2xl font-bold ${type === 'success' ? 'text-gray-800' : 'text-red-700'}`}>{title}</h3>
      <p className="text-gray-600 mt-2">{message}</p>
      <div className="flex justify-center space-x-4 mt-8">
        {onCancel && <button onClick={onCancel} className="px-8 py-2 rounded-md font-semibold transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</button>}
        <button onClick={onConfirm} className="px-8 py-2 rounded-md font-semibold transition-colors bg-[#FF9900] text-white hover:bg-orange-600">OK</button>
      </div>
    </div>
  </div>
);


const BranchSelectionDialogue = ({ onClose, onSelect }) => {
  const router = useRouter();
  const [search, setSearch] = useState({ code: "", name: "" });
  const [data, setData] = useState({ rows: [], total: 0, totalPages: 1, pageIndex: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchBranches(1);
  }, []);

  const fetchBranches = async (page = 1) => {
    setLoading(true);
    setError(null);
    const payload = new URLSearchParams();
    payload.append("ACTION", "2");
    payload.append("regClient", "Y");
    payload.append("actived", "Y");
    payload.append("cancelled", "N");
    payload.append("code", search.code);
    payload.append("name", search.name);
    payload.append("PAGE_INDEX", page - 1);

    try {
      const response = await apiFetcher('/api/branches', 'POST', payload, router);
      if (response && response.state === "0") {
        setData({
          rows: response.rows || [],
          total: Number(response.total),
          totalPages: Number(response.totalPages),
          pageIndex: Number(response.pageIndex),
        });
      } else {
        throw new Error(response.message || "API returned an error state.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOkClick = () => {
    if (selectedRow) onSelect(selectedRow);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-4 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Select Branch</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={24} /></button>
        </div>
        <div className="flex-grow overflow-auto border rounded-lg">
           <table className="w-full text-sm">
             <thead className="bg-gray-100 sticky top-0">
               <tr>
                 <th className="p-2 text-left font-semibold">Code</th>
                 <th className="p-2 text-left font-semibold">Name</th>
                 <th className="p-2 text-left font-semibold">Type</th>
               </tr>
             </thead>
             <tbody>
                {loading ? (
                    <tr><td colSpan="3" className="text-center p-4">Loading...</td></tr>
                ) : (
                    data.rows.map(row => (
                        <tr key={row.Code} onClick={() => setSelectedRow(row)} className={`cursor-pointer hover:bg-orange-100 ${selectedRow?.Code === row.Code ? 'bg-orange-200' : ''}`}>
                            <td className="p-2 border-t">{row.Code}</td>
                            <td className="p-2 border-t">{row.Name}</td>
                            <td className="p-2 border-t">{row.BranchType}</td>
                        </tr>
                    ))
                )}
             </tbody>
           </table>
        </div>
        <div className="flex justify-end gap-4 pt-4 border-t mt-4">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
          <button onClick={handleOkClick} disabled={!selectedRow} className="px-6 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 disabled:bg-gray-400">OK</button>
        </div>
      </div>
    </div>
  );
};

const MeterSelectionDialogue = ({ modelCode, onClose, onSelect }) => {
    const router = useRouter();
    const [data, setData] = useState({ rows: [], total: 0, totalPages: 1, pageIndex: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);

    useEffect(() => {
        if (modelCode) {
            fetchMeters(pageIndex);
        } else {
            setError("Please select a Meter Model first in the form.");
            setLoading(false);
        }
    }, [pageIndex, modelCode]);

    const fetchMeters = async (page) => {
        setLoading(true);
        setError(null);
        const payload = new URLSearchParams();
        payload.append("ACTION", "1");
        payload.append("PAGE_INDEX", page - 1);
        payload.append("status", "1");
        payload.append("modelCode", modelCode);

        try {
            const response = await apiFetcher('/api/public-exchange', 'POST', payload, router);
            if (response && response.state === "0") {
                setData({
                    rows: response.rows || [],
                    total: Number(response.total),
                    totalPages: Number(response.totalPages),
                    pageIndex: Number(response.pageIndex),
                });
            } else {
                throw new Error(response.message || "API returned an error state.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOkClick = () => {
        if (selectedRow) onSelect(selectedRow);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-4 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-xl font-semibold">Select Meter</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={24} /></button>
                </div>
                <div className="flex-grow overflow-auto border rounded-lg">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 sticky top-0">
                            <tr>
                                <th className="p-2 text-left font-semibold">Meter Num</th>
                                <th className="p-2 text-left font-semibold">Model Name</th>
                                <th className="p-2 text-left font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="3" className="text-center p-4">Loading...</td></tr>
                            ) : error ? (
                                <tr><td colSpan="3" className="text-center p-4 text-red-500">{error}</td></tr>
                            ) : (
                                data.rows.map(row => (
                                    <tr key={row.MeterNum} onClick={() => setSelectedRow(row)} className={`cursor-pointer hover:bg-orange-100 ${selectedRow?.MeterNum === row.MeterNum ? 'bg-orange-200' : ''}`}>
                                        <td className="p-2 border-t">{row.MeterNum}</td>
                                        <td className="p-2 border-t">{row.ModelName}</td>
                                        <td className="p-2 border-t">{row.StatusName}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center pt-4 border-t mt-4">
                     <div className="flex items-center gap-2 text-sm">
                        <button onClick={() => setPageIndex(1)} disabled={data.pageIndex <= 1} className="p-1 disabled:text-gray-300"><ChevronFirst /></button>
                        <button onClick={() => setPageIndex(p => p - 1)} disabled={data.pageIndex <= 1} className="p-1 disabled:text-gray-300"><ChevronLeft /></button>
                        <span>Page {data.pageIndex} of {data.totalPages}</span>
                        <button onClick={() => setPageIndex(p => p + 1)} disabled={data.pageIndex >= data.totalPages} className="p-1 disabled:text-gray-300"><ChevronRight /></button>
                        <button onClick={() => setPageIndex(data.totalPages)} disabled={data.pageIndex >= data.totalPages} className="p-1 disabled:text-gray-300"><ChevronLast /></button>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button onClick={handleOkClick} disabled={!selectedRow} className="px-6 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 disabled:bg-gray-400">OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const parseSelectOptions = (htmlString, selectId) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const select = doc.querySelector(`#${selectId}`);
    if (!select) return [];
    return Array.from(select.options).map(option => ({
        value: option.value,
        label: option.textContent
    }));
};

// --- Main Form Component ---
export default function RegisterCustomerForm({ onClose }) {
  const router = useRouter();
  const [step, setStep] = useState('customer-info');
  const [formData, setFormData] = useState({});
  const [selectOptions, setSelectOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [isMeterDialogOpen, setIsMeterDialogOpen] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        const cookieString = document.cookie;
        if (!cookieString) {
          router.push("/auth/login");
          return;
        }
        const response = await fetch('/api/register-customer', {
            method: 'POST',
            headers: { 'Cookie': cookieString }
        });
        const htmlText = await response.text();
        if (!response.ok) {
            throw new Error("Failed to fetch initial form data.");
        }
        
        setSelectOptions({
            priceType: parseSelectOptions(htmlText, 'edtPriceType'),
            connectionCode: parseSelectOptions(htmlText, 'edtConnectionCode'),
            tariffCode: parseSelectOptions(htmlText, 'edtTariffCode'),
            tariffResetDay: parseSelectOptions(htmlText, 'edtTariffResetDay'),
            installed: parseSelectOptions(htmlText, 'edtInstalled'),
            installCode: parseSelectOptions(htmlText, 'edtInstallCode'),
            modelCode: parseSelectOptions(htmlText, 'edtModelCode'),
            billingMode: parseSelectOptions(htmlText, 'edtBillingMode'),
        });
      } catch (error) {
        setApiError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [router]);

  useEffect(() => {
    if (formData.edtModelCode) {
        const fetchLoadOptions = async () => {
            const payload = new URLSearchParams();
            payload.append("ACTION", "70");
            payload.append("code", formData.edtModelCode);
            try {
                const data = await apiFetcher("/api/customer-exchange", "POST", payload, router);
                const phase = data["Phase"];
                let loadOptions = [];
                if (phase === "1") {
                    loadOptions = [{value: '1', label: '5A'}, {value: '2', label: '10A'}, {value: '3', label: '15A'}, {value: '4', label: '20A'}, {value: '5', label: '25A'}, {value: '6', label: '30A'}];
                } else if (phase === "3") {
                    loadOptions = [{value: '3', label: '5A'}, {value: '6', label: '10A'}, {value: '10', label: '15A'}, {value: '13', label: '20A'}, {value: '16', label: '25A'}, {value: '20', label: '30A'}, {value: '30', label: '45A'}, {value: '40', label: '60A'}];
                }
                setSelectOptions(prev => ({ ...prev, loadKW: loadOptions }));
            } catch (error) {
                console.error("Failed to fetch initial load options:", error);
            }
        };
        fetchLoadOptions();
    }
  }, [formData.edtModelCode, router]);

  const handleInputChange = (e) => {
      const { id, value, type, checked } = e.target;
      setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleSelectBranch = (branch) => {
      setFormData(prev => ({
          ...prev,
          edtBranchCode: branch.Code,
          edtBranchName: branch.Name,
          edtAreaCode: branch.AreaCode,
          edtAreaName: branch.AreaName,
      }));
      setIsBranchDialogOpen(false);
  };

  const handleSelectMeter = (meter) => {
      setFormData(prev => ({
          ...prev,
          edtMeterNum: meter.MeterNum,
      }));
      setIsMeterDialogOpen(false);
  };

  const handleNext = () => {
    if (step === 'customer-info') setStep('account-info');
    else if (step === 'account-info') setStep('meter-details');
    else if (step === 'meter-details') setStep('arrear-details');
  };

  const handlePrevious = () => {
    if (step === 'account-info') setStep('customer-info');
    else if (step === 'meter-details') setStep('account-info');
    else if (step === 'arrear-details') setStep('meter-details');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    const payload = new URLSearchParams();
    payload.append("ACTION", "3");

    const dataFields = {
        ACTION: "1", RefCode: formData.edtRefCode, ApplicationDate: formData.edtApplicationDate, AutoCloseDate: formData.edtAutoCloseDate,
        NoteExpiryDate: formData.edtNoteExpiryDate, RegDate: formData.edtRegDate, BranchCode: formData.edtBranchCode, PriceType: formData.edtPriceType,
        FullName: formData.edtFullName, CallFullName: formData.edtCallFullName, Notes: formData.edtNotes, IDNo: formData.edtIDNo,
        Members: formData.edtMembers, Mobile: formData.edtMobile, Phone: formData.edtPhone, Fax: formData.edtFax, Mail: formData.edtMail,
        AreaCode: formData.edtAreaCode, Address: formData.edtAddress, ModelCode: formData.edtModelCode, SGC: formData.edtSGC,
        BillingMode: formData.edtBillingMode, TariffCode: formData.edtTariffCode, MeterNum: formData.edtMeterNum, CardNum: formData.edtCardNum,
        LoadKW: formData.edtLoadKW, Capacity: formData.edtLoadKW, Installed: formData.edtInstalled, PostCode: formData.edtPostCode,
        Note: formData.edtNote, LimitKwh: formData.edtLimitKwh, TariffResetDay: formData.edtTariffResetDay, ConnectionCode: formData.edtConnectionCode,
        Blocked: formData.edtBlocked ? 'Y' : 'N', Installer: formData.edtInstaller, InstallDate: formData.edtInstallDate,
        InstallAddress: formData.edtInstallAddress, LineCode: "", TransCode: "", InstallTypeCode: formData.edtInstallCode
    };
    for (const key in dataFields) {
        payload.append(`data[0][${key}]`, dataFields[key] || '');
    }

    const registerFields = { RegDate: formData.edtRegDate, HT: "0.00", VAT: "0.00", Amt: "0.00", PayMode: "01", StampTAX: "0", NetAmt: "0.00" };
    for (const key in registerFields) {
        payload.append(`register[0][${key}]`, registerFields[key] || '');
    }

    try {
        const cookieString = document.cookie;
        if (!cookieString) {
          router.push("/auth/login");
          return;
        }
        const response = await fetch('/api/customer-exchange', {
            method: 'POST',
            headers: { 'Cookie': cookieString, 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload.toString()
        });

        const responseText = await response.text();
        if (!response.ok) { throw new Error(`HTTP error ${response.status}: ${responseText}`); }
      
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error(responseText); // If parsing fails, the error is the raw text
        }

        if (data.state !== 0 && data.state !== "0") {
            throw new Error(data.message || "Failed to register customer.");
        }
        setSuccessMessage("Customer registered successfully!");
    } catch (error) {
        setApiError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  if (isLoading && !selectOptions.priceType) {
      return <div className="text-center p-8">Loading form...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-fade-in">
      {apiError && <Popup type="error" title="Error" message={apiError} onConfirm={() => setApiError(null)} />}
      {successMessage && <Popup type="success" title="Success" message={successMessage} onConfirm={() => { setSuccessMessage(null); onClose(); }} />}
      {isBranchDialogOpen && <BranchSelectionDialogue onClose={() => setIsBranchDialogOpen(false)} onSelect={handleSelectBranch} />}
      {isMeterDialogOpen && <MeterSelectionDialogue modelCode={formData.edtModelCode} onClose={() => setIsMeterDialogOpen(false)} onSelect={handleSelectMeter} />}
      
      <form onSubmit={handleSubmit}>
        <div className="border-b border-gray-200">
          <nav className="flex bg-gradient-to-r from-[#000D35] to-[#FF9900] rounded-t-md text-sm font-medium">
            <TabButton label="Customer Information" stepName="customer-info" activeStep={step} onClick={() => setStep('customer-info')} />
            <TabButton label="Account Information" stepName="account-info" activeStep={step} onClick={() => setStep('account-info')} />
            <TabButton label="Meter Details" stepName="meter-details" activeStep={step} onClick={() => setStep('meter-details')} />
            <TabButton label="Arrear Details" stepName="arrear-details" activeStep={step} onClick={() => setStep('arrear-details')} />
          </nav>
        </div>
        
        <div className="p-6">
            {step === 'customer-info' && <CustomerInformation onNext={handleNext} onClose={onClose} options={selectOptions} formData={formData} handleChange={handleInputChange} />}
            {step === 'account-info' && <AccountInformation onPrevious={handlePrevious} onNext={handleNext} options={selectOptions} formData={formData} handleChange={handleInputChange} onOpenBranchDialog={() => setIsBranchDialogOpen(true)} />}
            {step === 'meter-details' && <MeterDetails onPrevious={handlePrevious} onNext={handleNext} options={selectOptions} formData={formData} handleChange={handleInputChange} onOpenMeterDialog={() => setIsMeterDialogOpen(true)} />}
            {step === 'arrear-details' && <ArrearDetails onPrevious={handlePrevious} onSubmit={handleSubmit} />}
        </div>
      </form>
    </div>
  );
}

// --- Helper & Step Components ---
const TabButton = ({ label, stepName, activeStep, onClick }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} 
       className={`flex-1 text-center py-3 px-1 transition-colors rounded-t-md ${activeStep === stepName ? 'text-[#FF9900] bg-white font-bold' : 'text-white hover:bg-white/20'}`}>
        {label}
    </a>
);

const FormInput = ({ label, id, required, ...props }) => (
    <div className="flex items-center">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 w-40 shrink-0">{label} {required && <span className="text-red-500 ml-1">*</span>}</label>
        <input id={id} {...props} className="h-9 flex-1 border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-orange-400 sm:text-sm" />
    </div>
);

const FormSelect = ({ label, id, options, ...props }) => (
    <div className="flex items-center">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 w-40 shrink-0">{label}</label>
        <select id={id} {...props} className="h-9 flex-1 border border-gray-300 rounded-md shadow-sm py-1.5 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 sm:text-sm">
            {options && options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);

const FormTextArea = ({ label, id, ...props }) => (
     <div className="flex items-start">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 w-40 pt-1.5 shrink-0">{label}</label>
        <textarea id={id} rows="4" {...props} className="flex-1 border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-orange-400 sm:text-sm"></textarea>
    </div>
);

const FormActions = ({ onCancel, onNext, onPrevious, isFirst, isLast }) => (
    <div className="mt-8 pt-6 border-t">
        <div className="flex justify-end gap-3">
            {!isFirst && <button type="button" onClick={onPrevious} className="bg-gray-200 py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300">Previous</button>}
            {onCancel && <button type="button" onClick={onCancel} className="bg-gray-200 py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300">Cancel</button>}
            <button type="button" onClick={onNext} className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF9900] hover:brightness-105 transition-colors">{isLast ? 'Submit' : 'Next'}</button>
        </div>
    </div>
);

const CustomerInformation = ({ onNext, onClose, options, formData, handleChange }) => (
  <>
    <div className="space-y-4 max-w-xl">
      <FormInput label="Account No." id="edtRefCode" value={formData.edtRefCode || ''} onChange={handleChange} required />
      <FormSelect label="Customer Type" id="edtPriceType" options={options.priceType} value={formData.edtPriceType || ''} onChange={handleChange} />
      <FormInput label="Full Name" id="edtFullName" placeholder="Full Name" value={formData.edtFullName || ''} onChange={handleChange}/>
      <FormInput label="Family Members" id="edtMembers" type="number" value={formData.edtMembers || '1'} onChange={handleChange}/>
      <FormInput label="ID Number" id="edtIDNo" placeholder="ID Number" value={formData.edtIDNo || ''} onChange={handleChange}/>
      <FormInput label="Phone No." id="edtPhone" type="tel" placeholder="Phone Number" value={formData.edtPhone || ''} onChange={handleChange}/>
      <FormInput label="Mobile No." id="edtMobile" type="tel" placeholder="Mobile Number" value={formData.edtMobile || ''} onChange={handleChange}/>
      <FormInput label="Fax No." id="edtFax" placeholder="Fax Number" value={formData.edtFax || ''} onChange={handleChange}/>
      <FormInput label="Email" id="edtMail" type="email" placeholder="email@example.com" value={formData.edtMail || ''} onChange={handleChange}/>
      <FormInput label="Post Code" id="edtPostCode" placeholder="Post Code" value={formData.edtPostCode || ''} onChange={handleChange}/>
      <FormTextArea label="Contact Address" id="edtAddress" placeholder="Contact Address" value={formData.edtAddress || ''} onChange={handleChange}/>
    </div>
    <FormActions onCancel={onClose} onNext={onNext} isFirst />
  </>
);

const AccountInformation = ({ onPrevious, onNext, options, formData, handleChange, onOpenBranchDialog }) => (
  <>
    <div className="space-y-4 max-w-xl">
        <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 w-40 shrink-0">Branch</label>
            <div className="flex-1 grid grid-cols-3 gap-2">
                <input id="edtBranchCode" value={formData.edtBranchCode || ''} readOnly placeholder="Code" className="h-9 col-span-1 border bg-gray-100 border-gray-300 rounded-md py-1.5 px-3 sm:text-sm" />
                <input id="edtBranchName" value={formData.edtBranchName || ''} readOnly placeholder="Name" className="h-9 col-span-2 border bg-gray-100 border-gray-300 rounded-md py-1.5 px-3 sm:text-sm" />
            </div>
            <button type="button" onClick={onOpenBranchDialog} className="ml-2 px-3 py-1.5 bg-[#000D35] text-white rounded-md text-lg">...</button>
        </div>
        <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 w-40 shrink-0">Region</label>
            <div className="flex-1 grid grid-cols-3 gap-2">
                <input id="edtAreaCode" value={formData.edtAreaCode || ''} readOnly placeholder="Code" className="h-9 col-span-1 border bg-gray-100 border-gray-300 rounded-md py-1.5 px-3 sm:text-sm" />
                <input id="edtAreaName" value={formData.edtAreaName || ''} readOnly placeholder="Name" className="h-9 col-span-2 border bg-gray-100 border-gray-300 rounded-md py-1.5 px-3 sm:text-sm" />
            </div>
        </div>
        <FormInput label="SGC" id="edtSGC" value={formData.edtSGC || ''} onChange={handleChange}/>
        <FormSelect label="Connection Code" id="edtConnectionCode" options={options.connectionCode} value={formData.edtConnectionCode || ''} onChange={handleChange}/>
        <FormSelect label="Tariff" id="edtTariffCode" options={options.tariffCode} value={formData.edtTariffCode || ''} onChange={handleChange}/>
        <FormSelect label="Tariff Reset Day" id="edtTariffResetDay" options={options.tariffResetDay} value={formData.edtTariffResetDay || ''} onChange={handleChange}/>
        <FormInput label="Reg. Date" id="edtRegDate" type="date" value={formData.edtRegDate || ''} onChange={handleChange}/>
        <FormInput label="Application Date" id="edtApplicationDate" type="date" value={formData.edtApplicationDate || ''} onChange={handleChange}/>
        <FormInput label="Auto Close Date" id="edtAutoCloseDate" type="date" value={formData.edtAutoCloseDate || ''} onChange={handleChange}/>
        <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 w-40">Blocked</label>
            <input type="checkbox" id="edtBlocked" checked={formData.edtBlocked || false} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 accent-[#FF9900]" />
        </div>
        <FormTextArea label="Notice Message" id="edtNote" placeholder="Notice Message" value={formData.edtNote || ''} onChange={handleChange}/>
        <FormInput label="Expiry Date" id="edtNoteExpiryDate" type="date" value={formData.edtNoteExpiryDate || ''} onChange={handleChange}/>
    </div>
    <FormActions onPrevious={onPrevious} onNext={onNext} />
  </>
);

const MeterDetails = ({ onPrevious, onNext, options, formData, handleChange, onOpenMeterDialog }) => (
  <>
    <div className="space-y-4 max-w-xl">
        <FormSelect label="Installed" id="edtInstalled" options={options.installed} value={formData.edtInstalled || ''} onChange={handleChange}/>
        <FormInput label="Ins. Date" id="edtInstallDate" type="date" value={formData.edtInstallDate || ''} onChange={handleChange}/>
        <FormSelect label="Installation Code" id="edtInstallCode" options={options.installCode} value={formData.edtInstallCode || ''} onChange={handleChange}/>
        <FormSelect label="Meter Model" id="edtModelCode" options={options.modelCode} value={formData.edtModelCode || ''} onChange={handleChange}/>
        <FormSelect label="Initial Load" id="edtLoadKW" options={options.loadKW || []} value={formData.edtLoadKW || ''} onChange={handleChange}/>
        <FormSelect label="Billing Mode" id="edtBillingMode" options={options.billingMode} value={formData.edtBillingMode || ''} onChange={handleChange}/>
        <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 w-40 shrink-0">Meter Num.</label>
            <div className="flex-1 flex items-center gap-2">
                <input id="edtMeterNum" value={formData.edtMeterNum || ''} onChange={handleChange} className="h-9 flex-1 border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-orange-400 sm:text-sm" />
                <button type="button" onClick={onOpenMeterDialog} className="px-3 py-1.5 bg-[#000D35] text-white rounded-md text-lg">...</button>
            </div>
        </div>
        <FormInput label="Card No." id="edtCardNum" value={formData.edtCardNum || ''} onChange={handleChange}/>
        <FormInput label="Installation Personnel" id="edtInstaller" value={formData.edtInstaller || ''} onChange={handleChange}/>
        <FormInput label="GPS Code" id="edtInstallAddress" value={formData.edtInstallAddress || ''} onChange={handleChange}/>
    </div>
    <FormActions onPrevious={onPrevious} onNext={onNext} />
  </>
);

const ArrearDetails = ({ onPrevious, onSubmit }) => (
  <>
    <div className="mt-6">
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-[#000D35] to-[#FF9900] text-white h-12">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Arrear</th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Description</th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Pay Method</th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Amount</th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Payable</th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Paying Date</th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2" colSpan="7">
                <div className="flex items-center justify-center text-gray-500 h-24">
                  No arrear details available.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <FormActions onPrevious={onPrevious} onNext={onSubmit} isLast />
  </>
);
