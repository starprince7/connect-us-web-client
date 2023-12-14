import type { ReportHandler } from 'web-vitals'

const reportWebVitals = async (onPerfEntry?: ReportHandler): Promise<void> => {
  if (onPerfEntry !== null && onPerfEntry !== undefined && onPerfEntry instanceof Function) {
    const webVitals = await import('web-vitals')
    webVitals.getCLS(onPerfEntry)
    webVitals.getFID(onPerfEntry)
    webVitals.getFCP(onPerfEntry)
    webVitals.getLCP(onPerfEntry)
    webVitals.getTTFB(onPerfEntry)
  }
}

// const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
//       getCLS(onPerfEntry)
//       getFID(onPerfEntry)
//       getFCP(onPerfEntry)
//       getLCP(onPerfEntry)
//       getTTFB(onPerfEntry)
//     })
//   }
// }

export default reportWebVitals
