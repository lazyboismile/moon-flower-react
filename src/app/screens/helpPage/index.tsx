import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Stack,
  Tabs,
  Button,
  Typography,
  Tab,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import emailjs from "emailjs-com";

export default function HelpPage() {
  const [value, setValue] = useState("1");
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChangeTab = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      process.env.REACT_APP_Service_ID || "",
      process.env.REACT_APP_Template_ID || "",
      {
        from_name: form.name,
        to_name: "Moon $ Flower Admin",
        from_email: form.email,
        to_email: "lazyboijon@gmail.com",
        message: form.message,
      },
      process.env.REACT_APP_Public_Key || ""
    )
      .then(() => {
        setLoading(false);
        alert("Thank you! I will get back to you as soon as possible.");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="help-page">
      <Container className="help-container">
        <TabContext value={value}>
          <Box className="help-menu">
            <Tabs
              value={value}
              onChange={handleChangeTab}
              aria-label="Help menu tabs"
              className="table_list"
            >
              <Tab label="TERMS" value="1" />
              <Tab label="FAQ" value="2" />
              <Tab label="CONTACT" value="3" />
            </Tabs>
          </Box>
          <Stack className="help-main-content">
            <TabPanel value="1">
              <Box className="rules-frame">
                {terms.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </Box>
            </TabPanel>

            <TabPanel value="2">
              <Stack className="accordion-menu">
                {faq.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </TabPanel>

            <TabPanel value="3">
              <Stack className="admin-letter-box">
                <Stack className="admin-letter-container">
                  <Box className="admin-letter-frame">
                    <span>Contact us!</span>
                    <p>Fill out the form below to send a message</p>
                  </Box>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="admin-letter-frame"
                  >
                    <div className="admin-input-box">
                      <label>Your name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        placeholder="Type your name here"
                        onChange={handleChangeText}
                        required
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Your email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        placeholder="Type your email here"
                        onChange={handleChangeText}
                        required
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        placeholder="Your message"
                        onChange={handleChangeText}
                        required
                      ></textarea>
                    </div>
                    <Box display="flex" justifyContent="flex-end" mt="30px">
                      <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? "Sending..." : "Send"}
                      </Button>
                    </Box>
                  </form>
                </Stack>
              </Stack>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
