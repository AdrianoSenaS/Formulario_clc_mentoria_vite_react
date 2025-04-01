import { useState } from 'react'
import './App.css'

const ServiceRquestForm = ()=>{
  const [formData, setformData] = useState({
    serviceType:"",
    date:"",
    fullName:"",
    contactNumber:"",
    description:"",
    additionalNotes:"",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [isSubmitted, setIsSubmitted] = useState(false); 


  const handleChange = (e: { target: { name: any; value: any; }; })=>{
      const {name, value} = e.target;
      setformData({...formData,[name]:value});
  }

  const handleSubmit = async (e: { preventDefault: () => void; })=>{
    e.preventDefault();
    console.log(formData);
    setIsSubmitting(true); 
    try {
      const response = await fetch('/api/SendEmailClc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true); 
      } else {
        
        alert('Erro ao enviar o e-mail.');
        console.log(response.statusText);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
    setIsSubmitting(false);
  }
  if (isSubmitted) {
    return (
      <div className="thank-you">
        <h1>Obrigado!</h1>
        <p>
          Agradecemos por sua escolha! <br />
          Após o preenchimento deste formulário, entraremos em contato para
          confirmar os detalhes e agendar o seu serviço.
        </p>
      </div>
    );
  }
  return(
    <div>
      <h1>Formulário de Solicitação de Serviço</h1>
      <p>Obrigado por escolher a CLC Mentoria e Palestras!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Serviço:</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="Treinamento">
              Treinamento (Capacitação técnica e desenvolvimento de habilidades)
            </option>
            <option value="Mentoria">
              Mentoria (Aconselhamento individual ou em grupo)
            </option>
            <option value="Palestra">
              Palestra (Evento sobre temas motivacionais ou específicos)
            </option>
          </select>
        </div>

        <div>
          <label>Data para realização do serviço:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nome Completo:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Número de Contato (WhatsApp ou Telefone):</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descrição do que você busca com o serviço:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label>Observações adicionais:</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" disabled={isSubmitting}>  {isSubmitting ? "Enviando..." : "Enviar"}</button>
      </form>
    </div>
  )
}
export default ServiceRquestForm;
