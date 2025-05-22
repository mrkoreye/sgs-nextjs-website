import Head from "next/head";
import React from "react";
import styles from "@/styles/Shows.module.css";

// Sample show data
const shows = [
  {
    id: 1,
    date: "2023-11-25",
    venue: "The Fillmore",
    city: "San Francisco, CA",
    ticketLink: "https://ticketmaster.com",
  },
  {
    id: 2,
    date: "2023-12-10",
    venue: "Bowery Ballroom",
    city: "New York, NY",
    ticketLink: "https://ticketmaster.com",
  },
  {
    id: 3,
    date: "2023-12-15",
    venue: "The Troubadour",
    city: "Los Angeles, CA",
    ticketLink: "https://ticketmaster.com",
  },
  {
    id: 4,
    date: "2024-01-20",
    venue: "Metro",
    city: "Chicago, IL",
    ticketLink: "https://ticketmaster.com",
  },
  {
    id: 5,
    date: "2024-02-14",
    venue: "9:30 Club",
    city: "Washington, DC",
    ticketLink: "https://ticketmaster.com",
  },
];

export default function Shows() {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Head>
        <title>Upcoming Shows | Solid Gold Stranger</title>
        <meta
          name="description"
          content="Check out all upcoming shows and tour dates for Solid Gold Stranger"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Upcoming Shows</h1>
          <p className={styles.subtitle}>
            Come see Solid Gold Stranger live in concert!
          </p>

          {shows.length === 0 ? (
            <p className={styles.noShows}>
              No upcoming shows scheduled. Check back soon!
            </p>
          ) : (
            <ul className={styles.showsList}>
              {shows.map((show) => (
                <li key={show.id} className={styles.showCard}>
                  <div className={styles.showDate}>{formatDate(show.date)}</div>
                  <div className={styles.showInfo}>
                    <h2 className={styles.venueName}>{show.venue}</h2>
                    <p className={styles.cityName}>{show.city}</p>
                  </div>
                  <div className={styles.ticketContainer}>
                    <a
                      href={show.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.ticketButton}
                    >
                      Get Tickets
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.bookingInfo}>
            <h2>Want to book us?</h2>
            <p>
              For booking inquiries, please contact our manager at{" "}
              <a href="mailto:booking@solidgoldstranger.com">
                booking@solidgoldstranger.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
