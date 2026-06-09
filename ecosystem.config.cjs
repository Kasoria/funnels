module.exports = {
  apps: [
    {
      name: "kasoria-funnels",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3018",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3018,
      },
      time: true,
      out_file: "logs/pm2-out.log",
      error_file: "logs/pm2-error.log",
      merge_logs: true,
    },
  ],
};
