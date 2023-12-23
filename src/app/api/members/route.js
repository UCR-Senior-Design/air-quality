import { authenticate } from "@/utils/authenticate";
import Fault from "@/utils/error";
import { NextResponse } from "next/server";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const GET = async () => {
  const { auth, message } = await authenticate({
    researcher: [1],
  });

  if (message !== null) {
    throw new Fault(auth, message, "", "");
  }

  const snapshot = await getDocs(collection(db, "users"));

  const data = [];

  snapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return NextResponse.json({ data }, { status: 200 });
};
