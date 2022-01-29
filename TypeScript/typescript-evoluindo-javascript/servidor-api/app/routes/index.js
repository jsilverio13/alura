/* Código simplório, apenas para fornecer o serviço para a aplicação */

import { dados } from '../api';

export default function(app) {
        
    app.route('/dados')
        .get(dados);          
};