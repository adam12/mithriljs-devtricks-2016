require "json"

class Job
  def self.async(tube, method, *arguments)
    payload = {
      method: method,
      args: arguments
    }
    tube.put JSON.generate(payload)
  end

  def self.perform(payload)
    job = JSON.parse(payload)
    puts "Payload: #{job}"

    new.public_send(job["method"], *job["args"])
  end

  def send_welcome_email(email_address)
    puts "Sending welcome email to #{email_address}"
    sleep 10 # Artificially delay
    puts "Done!"
  end
end
