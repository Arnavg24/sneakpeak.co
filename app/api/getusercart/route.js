import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const {userId } = await req.json();
        console.log("custid",userId);

        
        const userRes = await query({
            query: "SELECT c.CartID, c.Quantity, s.ShoeID, s.ShoeName, s.Size, s.ShoeCompany, s.ShoeType, s.NumberOfItems, s.MarkedPrice, s.DiscountPercentage, s.PriceAfterDiscount " +
                   "FROM Cart c " +
                   "JOIN Shoe s ON c.ShoeID = s.ShoeID " +
                   "WHERE c.CustomerID = ?;",
            values: [userId],
        });
        // console.log(userRes);
        return NextResponse.json({cartlist:userRes}, { status: 200 });

        
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
