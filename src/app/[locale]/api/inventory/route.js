
import { NextResponse } from 'next/server';
import { vehicles } from '@/lib/mockData'; // Import from centralized mock data

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get a real-time summary of vehicle inventory.
 *     description: Returns the total and available count for each vehicle class.
 *     tags:
 *       - Inventory
 *     responses:
 *       200:
 *         description: A JSON object containing the inventory summary.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inventorySummary:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       class:
 *                         type: string
 *                         description: The vehicle class (e.g., コンパクト, SUV).
 *                       total:
 *                         type: integer
 *                         description: Total number of vehicles in this class.
 *                       available:
 *                         type: integer
 *                         description: Number of currently available vehicles in this class.
 *             example:
 *               inventorySummary:
 *                 - class: "コンパクト"
 *                   total: 5
 *                   available: 2
 *                 - class: "SUV"
 *                   total: 3
 *                   available: 3
 */
export async function GET() {
    // In a real app, this data would be fetched from a live database.
    const inventory = vehicles;

    const summary = inventory.reduce((acc, vehicle) => {
        // Find or create an entry for the vehicle class
        let classEntry = acc.find(item => item.class === vehicle.class);
        if (!classEntry) {
            classEntry = { class: vehicle.class, total: 0, available: 0 };
            acc.push(classEntry);
        }

        // Increment total count
        classEntry.total += 1;

        // Increment available count if the status is '利用可能'
        if (vehicle.status === '利用可能') {
            classEntry.available += 1;
        }

        return acc;
    }, []);

    return NextResponse.json({ inventorySummary: summary });
}
