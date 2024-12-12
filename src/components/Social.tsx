const Social = () => {
  return (
    <div className="mx-auto max-w-2xl pt-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Segueix-nos</h2>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://www.instagram.com/energia.malgrat"
            title="Instagram"
            className="block"
            target="_blank"
            rel="noreferrer"
          >
            <img height="48" width="48" src="https://cdn.simpleicons.org/instagram" alt="logo instagram" />
          </a>
          <a href="https://t.me/+hi_kKSo2UQY4ODNk" title="Telegram" className="block" target="_blank" rel="noreferrer">
            <img height="48" width="48" src="https://cdn.simpleicons.org/telegram" alt="logo telegram" />
          </a>
          <a
            href="https://x.com/EnergiaMalgrat?t=Ec9S6K2wD9Dfq9CIdKbN3w&s=09"
            title="X (Twitter)"
            className="block"
            target="_blank"
            rel="noreferrer"
          >
            <img height="48" width="48" src="https://cdn.simpleicons.org/x" alt="logo X (twitter)" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
