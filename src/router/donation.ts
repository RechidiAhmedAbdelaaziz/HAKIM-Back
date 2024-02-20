import express from "express";
import { verifyAuthorization } from "../middlewares";
import { DonationController as donation } from "../feauture/donation/controller/donation";

const router = express.Router();

router.use(verifyAuthorization);

router.route("/").get(donation.listDonations).post(donation.requestDonation);
router.patch("/:id", donation.editRequest);

export { router as DonationRouter };
