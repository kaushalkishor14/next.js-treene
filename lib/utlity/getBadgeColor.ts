// utils/getBadgeColor.js
export const getBadgeColor = (status: any) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-white'; // Yellow for pending
      case 'processing':
        return 'bg-blue-500 text-white'; // Blue for processing
      case 'completed':
        return 'bg-green-500 text-white'; // Green for completed
      case 'canceled':
        return 'bg-red-500 text-white'; // Red for canceled
      default:
        return 'bg-gray-500 text-white'; // Default color
    }
  };
  