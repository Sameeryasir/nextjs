"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function DashboardCharts({ salesData, marketData }) {
    const salesChartRef = useRef(null);
    const marketChartRef = useRef(null);

    useEffect(() => {
        let salesChartInstance;
        let marketChartInstance;

        if (salesChartRef.current && salesData) {
            const salesCtx = salesChartRef.current.getContext('2d');
            salesChartInstance = new Chart(salesCtx, {
                type: 'doughnut',
                data: {
                    labels: salesData.labels,
                    datasets: [{
                        label: 'Sales by Channel',
                        data: salesData.data,
                        backgroundColor: ['#00E68A', '#0000FF'],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' },
                        title: {
                            display: true,
                            text: '(%) DES VENTES PAR CANAL DE PAIEMENT'
                        }
                    }
                }
            });
        }

        if (marketChartRef.current && marketData) {
            const marketCtx = marketChartRef.current.getContext('2d');
            marketChartInstance = new Chart(marketCtx, {
                type: 'doughnut',
                data: {
                    labels: marketData.labels,
                    datasets: [{
                        label: 'Market Share by USSD Operator',
                        data: marketData.data,
                        backgroundColor: ['#FFCC00', '#0000FF', '#00E68A', '#FF6600'],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' },
                        title: {
                            display: true,
                            text: '(%) DE PART DE MARCHES PAR OPERATEUR USSD'
                        }
                    }
                }
            });
        }

        return () => {
            if (salesChartInstance) salesChartInstance.destroy();
            if (marketChartInstance) marketChartInstance.destroy();
        };
    }, [salesData, marketData]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200" style={{ height: '400px' }}>
                <canvas ref={salesChartRef}></canvas>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200" style={{ height: '400px' }}>
                <canvas ref={marketChartRef}></canvas>
            </div>
        </div>
    );
}

export default DashboardCharts;
